from rest_framework.serializers import ModelSerializer

from .models import Product, Collection


class SimpleProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'unit_price', 'rate', 'inventory_status']


class SimpleCollectionSerializer(ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id', 'title']


class CollectionSerializer(ModelSerializer):
    products = SimpleProductSerializer(many=True)

    class Meta:
        model = Collection
        fields = ['id', 'title', 'products']


class ShowProductSerializer(ModelSerializer):
    collections = SimpleCollectionSerializer(many=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'unit_price',
                  'rate', 'inventory', 'inventory_status', 'collections']


class CreateProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'unit_price',
                  'inventory', 'inventory_status', 'collections']
