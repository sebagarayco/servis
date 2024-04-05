import ccard
import random
from django.db.models import Avg
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
    image = models.ImageField(
        upload_to='images/', default='images/admindefaultservice.jpg', null=True, blank=True)
    subcategory = models.ForeignKey(
        Subcategory, on_delete=models.CASCADE, related_name='service_subcategory')
    provider = models.ForeignKey(
        ServisUser, default=None, on_delete=models.CASCADE, related_name='offer_provider')
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s - %s (%s)" % (self.description, self.subcategory, self.provider)

class Contract(models.Model):
    STATUS = [
        ('En espera', 'En espera'),
        ('En progreso', 'En progreso'),
        ('Completado', 'Completado'),
        ('Rechazado', 'Rechazado'),
        ('Cancelado', 'Cancelado')
    ]

    is_active = models.BooleanField(default=True)
    description = models.CharField(max_length=500, default=None)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    service = models.ForeignKey(Service, on_delete=models.RESTRICT)
    status = models.CharField(
        choices=STATUS, default=STATUS[0][0], max_length=20)
    consumer = models.ForeignKey(
        ServisUser, default=None, on_delete=models.CASCADE, related_name='hire_consumer')
    provider = models.ForeignKey(
        ServisUser, default=None, on_delete=models.CASCADE, related_name='hire_provider')

    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    # @property
    # def average_rating(self) -> float:
    #    return ContractReview.objects.filter(contract=self).aggregate(Avg("rating"))["rating__avg"] or 0

    def __str__(self):
        return f"{self.consumer} -> {self.provider} || {self.description}"


class ContractReview(models.Model):
    contract = models.ForeignKey(
        Contract, on_delete=models.CASCADE, related_name='contract_reviews')
    review = models.CharField(max_length=500, null=True, blank=True)
    user = models.ForeignKey(ServisUser, default=None,
                             on_delete=models.CASCADE)
    rating = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

class ContractComments(models.Model):
    contract = models.ForeignKey(
        Contract, on_delete=models.CASCADE, related_name='contract_comments')
    user = models.ForeignKey(ServisUser, on_delete=models.CASCADE)
    comment = models.CharField(max_length=500)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Contract Comments"

    def __str__(self):
        return f"{self.user} - {self.contract} Comment"

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
