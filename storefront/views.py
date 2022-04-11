from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin

from .models import CartItem, Order, Product, Collection, Cart
from .serializers import CreateCartItemSerializer, CreateOrderSerializer, OrderSerializer, ProductSerializer, CreateProductSerializer, \
    CollectionSerializer, CartSerializer, CartItemSerializer, UpdateCartItemSerializer


class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ProductSerializer
        return CreateProductSerializer


class CartViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin, GenericViewSet):
    queryset = Cart.objects.prefetch_related('cart_items').all()
    serializer_class = CartSerializer


class CartItemViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch', 'delete']

    queryset = CartItem.objects.select_related('product').all()

    def get_serializer_class(self):
        method = self.request.method
        if method == 'GET':
            return CartItemSerializer
        elif method == 'PATCH':
            return UpdateCartItemSerializer
        return CreateCartItemSerializer

    def get_serializer_context(self):
        return {**super().get_serializer_context(), 'cart_id': self.kwargs['cart_pk']}


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()

    def get_serializer_class(self):
        method = self.request.method
        if method == 'GET':
            return OrderSerializer
        return CreateOrderSerializer

    def get_serializer_context(self):
        return {**super().get_serializer_context(), 'user_id': self.request.user.id}
