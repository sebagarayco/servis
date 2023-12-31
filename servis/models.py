import ccard
import random
from django.conf import settings
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from users.models import ServisUser
from django.dispatch import receiver
from django.db.models.signals import post_save
from multiselectfield import MultiSelectField
from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField

class Category(models.Model):
    name = models.CharField(max_length=35)
    description = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Subcategory(models.Model):
    name = models.CharField(max_length=35)
    description = models.CharField(max_length=255)
    category = models.ForeignKey(
        Category, related_name='subcategory', on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "Subcategories"

    def __str__(self):
        return "%s (%s)" % (self.name, self.category.name)

class Service(models.Model):
    description = models.CharField(max_length=255)
    hourly_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    full_day_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    subcategory = models.ForeignKey(
        Subcategory, on_delete=models.CASCADE, related_name='service_subcategory')
    provider = models.ForeignKey(
        ServisUser, default=None, on_delete=models.CASCADE, related_name='offer_provider')

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s - %s (%s)" % (self.description, self.subcategory, self.provider)

class ServiceReview(models.Model):
    description = models.CharField(max_length=1000)
    rating = models.DecimalField(max_digits=2, decimal_places=0)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Contract(models.Model):
    status = [
        ('In-progress', 'In-progress'),
        ('On-hold', 'On-hold'),
        ('Completed', 'Completed'),
        ('Rejected', 'Rejected'),
    ]
    is_active = models.BooleanField(default=True)
    comments = models.CharField(max_length=500, default=None)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    status = models.CharField(
        choices=status, default='On-hold', max_length=25)
    consumer = models.ForeignKey(
        ServisUser, default=None, on_delete=models.CASCADE, related_name='hire_consumer')
    provider = models.ForeignKey(
        ServisUser, default=None, on_delete=models.CASCADE, related_name='hire_provider')

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.consumer} - {self.provider} Contract"

class Transaction(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    contract = models.ForeignKey(
        Contract, default=None, on_delete=models.CASCADE)
    consumer = models.ForeignKey(
        ServisUser, default=None, on_delete=models.CASCADE, related_name='transaction_consumer')
    provider = models.ForeignKey(
        ServisUser, default=None, on_delete=models.CASCADE, related_name='transaction_provider')

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
