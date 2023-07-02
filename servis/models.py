import ccard
import random
from django.conf import settings
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.dispatch import receiver
from django.db.models.signals import post_save
from multiselectfield import MultiSelectField
from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField


class Profile(models.Model):
    roles = [
        ('Provider', 'Provider'),
        ('Consumer', 'Consumer'),
    ]
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    role = MultiSelectField(choices=roles, default='Consumer',
                            max_choices=2, max_length=15)
    image = models.ImageField(
        default='images/default.jpg', upload_to='images')
    location = models.PointField(geography=True, default=None)
    phone = models.CharField(max_length=15, default=None)
    cc_number = CardNumberField(default=None)
    cc_expiry = CardExpiryField(default=None)
    cc_code = SecurityCodeField(default=None)
    bank_account = models.CharField(default=None)

    class Meta:
        verbose_name_plural = "User Profiles"

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance,
                                   location=Point(
                                       random.uniform(-71, -71.5), random.uniform(-41, -42.5)),
                                   phone="+54-11-%s" % (random.randint(1, 9999999)),
                                   cc_number=ccard.visa(),
                                   cc_expiry="%s/%s" % (random.randint(1, 12),
                                                        random.randint(24, 30)),
                                   cc_code=random.randint(100, 999),
                                   bank_account=random.randint(1, 9999999999999999999999))

    def __str__(self):
        return self.user.username


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


class Contract(models.Model):
    status = [
        ('In-progress', 'In-progress'),
        ('On-hold', 'On-hold'),
        ('Completed', 'Completed'),
        ('Rejected', 'Rejected'),
    ]
    delivery_date = models.DateField()
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    status = models.CharField(
        choices=status, default='In-Progress', max_length=25)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE)
    consumer = models.ForeignKey(
        Profile, default=None, on_delete=models.CASCADE, related_name='hire_consumer')
    provider = models.ForeignKey(
        Profile, default=None, on_delete=models.CASCADE, related_name='hire_provider')

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    contract = models.ForeignKey(
        Contract, default=None, on_delete=models.CASCADE)
    consumer = models.ForeignKey(
        Profile, default=None, on_delete=models.CASCADE, related_name='transaction_consumer')
    provider = models.ForeignKey(
        Profile, default=None, on_delete=models.CASCADE, related_name='transaction_provider')

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Service(models.Model):
    description = models.CharField(max_length=255)
    hourly_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    full_day_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=None)
    # category = models.ForeignKey(
    #    Category, on_delete=models.CASCADE, related_name='service_category')
    subcategory = models.ForeignKey(
        Subcategory, on_delete=models.CASCADE, related_name='service_subcategory')
    provider = models.ForeignKey(
        Profile, default=None, on_delete=models.CASCADE, related_name='offer_provider')

    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.description


class ServiceReview(models.Model):
    description = models.CharField(max_length=1000)
    rating = models.DecimalField(max_digits=2, decimal_places=0)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
