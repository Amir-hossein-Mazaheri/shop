from rest_framework import serializers

from .models import Cart, CartItem, Order, Product, Collection


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


class CreateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['customer']
