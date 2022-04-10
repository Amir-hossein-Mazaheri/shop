from rest_framework.viewsets import ModelViewSet

from .models import Product, Collection
from .serializers import ShowProductSerializer, CreateProductSerializer, CollectionSerializer


class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return ShowProductSerializer
        return CreateProductSerializer
