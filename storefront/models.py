from uuid import uuid4
from django.conf import settings
from django.db import models


class Collection(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Product(models.Model):
    INVENTORY_STATUS_STOCK = "S"
    INVENTORY_STATUS_OUT_OF_STOCK = "O"
    INVENTORY_STATUS_CHOICES = [
        (INVENTORY_STATUS_STOCK, "Stock"),
        (INVENTORY_STATUS_OUT_OF_STOCK, "Out of Stock")
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    unit_price = models.DecimalField(max_digits=6, decimal_places=2)  # 9999.99
    rate = models.DecimalField(
        max_digits=3, decimal_places=2, null=True, blank=True)  # 4.53
    inventory = models.PositiveIntegerField()
    inventory_status = models.CharField(
        max_length=1, choices=INVENTORY_STATUS_CHOICES)
    collections = models.ManyToManyField(Collection, related_name='products')

    def __str__(self):
        return self.title


class Comment(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)


class CartItem(models.Model):
    unit_price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.PositiveIntegerField()
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='cart_items')
    cart = models.ForeignKey(
        Cart, on_delete=models.CASCADE, related_name='cart_items')


class Customer(models.Model):
    MEMBERSHIP_CHOICES_NORMAL = 'N'
    MEMBERSHIP_CHOICES_PREMIUM = 'P'
    MEMBERSHIP_CHOICES = [
        (MEMBERSHIP_CHOICES_PREMIUM, 'Premium'),
        (MEMBERSHIP_CHOICES_NORMAL, 'Normal')
    ]

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=255)
    address = models.TextField()
    membership = models.CharField(
        max_length=1, choices=MEMBERSHIP_CHOICES, default='N')
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                                on_delete=models.CASCADE)


class Order(models.Model):
    PAYMENT_STATUS_PENDING = 'P'
    PAYMENT_STATUS_COMPLETE = 'C'
    PAYMENT_STATUS_FAILED = 'F'
    PAYMENT_STATUS_CHOICES = [
        (PAYMENT_STATUS_PENDING, 'Pending'),
        (PAYMENT_STATUS_COMPLETE, 'Complete'),
        (PAYMENT_STATUS_FAILED, 'Failed')
    ]

    payment_status = models.CharField(
        max_length=1, choices=PAYMENT_STATUS_CHOICES)
    placed_at = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='orders')


class OrderItem(models.Model):
    unit_price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.PositiveIntegerField()
    product = models.ForeignKey(
        Product, on_delete=models.PROTECT, related_name='order_items')
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='order_items')
