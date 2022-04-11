from django.db import transaction
from rest_framework import serializers

from .models import Cart, CartItem, Order, OrderItem, Product, Collection


class SimpleCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id', 'title']


class SuperSimpleProductSerializer(serializers.ModelSerializer):
    collections = SimpleCollectionSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'collections']


class SimpleProductSerializer(serializers.ModelSerializer):
    collections = SimpleCollectionSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'unit_price',
                  'rate', 'inventory_status', 'collections']


class CollectionSerializer(serializers.ModelSerializer):
    products = SimpleProductSerializer(many=True)

    class Meta:
        model = Collection
        fields = ['id', 'title', 'products']


class ProductSerializer(serializers.ModelSerializer):
    collections = SimpleCollectionSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'unit_price',
                  'rate', 'inventory', 'inventory_status', 'collections']


class CreateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'unit_price',
                  'inventory', 'inventory_status', 'collections']


class CartItemSerializer(serializers.ModelSerializer):
    total_price = serializers.SerializerMethodField(read_only=True)
    product = SuperSimpleProductSerializer()

    def get_total_price(self, cart_item):
        return cart_item.unit_price * cart_item.quantity

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'unit_price', 'quantity', 'total_price']


class CreateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['product', 'quantity']

    def save(self, **kwargs):
        product = self.validated_data['product']
        quantity = self.validated_data['quantity']
        cart_id = self.context['cart_id']
        unit_price = product.unit_price

        try:
            cart_item = CartItem.objects.get(
                cart_id=cart_id, product=product.id)
            cart_item.quantity = quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(
                product=product, unit_price=unit_price, cart_id=cart_id, quantity=quantity)

        return self.instance


class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['quantity']


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True, source='cart_items')
    total_price = serializers.SerializerMethodField()

    def get_total_price(self, cart):
        return sum([(item.quantity * item.unit_price) for item in cart.cart_items.all()])

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'payment_status', 'placed_at', 'customer']


class CreateOrderSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField()

    def validate(self, attrs):
        cart_id = attrs['cart_id']
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError('No cart found with given id')
        elif CartItem.objects.filter(cart_id=cart_id).count() == 0:
            raise serializers.ValidationError('Cart is empty')
        return attrs

    def create(self, validated_data):
        with transaction.atomic():
            cart_id = validated_data['cart_id']
            cart_items = CartItem.objects.filter(cart_id=cart_id)
            customer = self.context['user_id']
            order = Order.objects.create(
                customer=customer)  # 1. create a order

            order_items = [
                OrderItem(
                    unit_price=item.unit_price,
                    quantity=item.quantity,
                    product=item.product,
                    order=order,
                )
                for item in cart_items
            ]

            # 2. create order items for order
            OrderItem.objects.bulk_create(order_items)

            Cart.objects.filter(pk=cart_id).delete()  # 3. delete cart

            return order
