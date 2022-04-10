from django.urls import path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('collections', views.CollectionViewSet, basename='collections')
router.register('products', views.ProductViewSet, basename='products')

urlpatterns = router.urls
