import ccard
import random
from django.conf import settings
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from users.models import ServisUser
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.mail import send_mail
from django.template.loader import render_to_string

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


### SIGNALS ###
@receiver(post_save, sender=Contract)
def send_contract_notification_email(sender, instance, created, **kwargs):
    try:
        if hasattr(settings, 'EMAIL_ENABLE') and settings.EMAIL_ENABLE:
            if created:
                subject = 'Nuevo Contrato Creado #{}'.format(instance.id)
                template = 'contract_created_email.html'
            else:
                subject = 'Contrato Actualizado #{}'.format(instance.id)
                template = 'contract_updated_email.html'

            context = {
                'object_type': 'Contract',
                'object_id': instance.id,
                'contract': instance
            }

            provider_emails = [
                instance.provider.email, instance.consumer.email]
            html_message = render_to_string(template, context)
            sender_email = settings.EMAIL_HOST_USER

            for email in provider_emails:
                send_mail(subject, '', sender_email, [
                          email], html_message=html_message)
    except Exception as e:
        print('CONTRACT MAIL SENDER EXCEPTION: ', e, instance)


@receiver(post_save, sender=Service)
def send_service_notification_email(sender, instance, created, **kwargs):
    try:
        if hasattr(settings, 'EMAIL_ENABLE') and settings.EMAIL_ENABLE:
            if created:
                subject = 'Nuevo Servicio Creado #{}'.format(instance.id)
                template = 'service_created_email.html'
            else:
                subject = 'Servicio Actualizado #{}'.format(instance.id)
                template = 'service_updated_email.html'

            context = {
                'object_type': 'Service',
                'object_id': instance.id,
                'service': instance
            }

            # Get the email of the provider associated with the Service
            provider_email = instance.provider.email

            html_message = render_to_string(template, context)
            sender_email = settings.EMAIL_HOST_USER

            send_mail(subject, '', sender_email, [
                      provider_email], html_message=html_message)
    except Exception as e:
        print('SERVICE MAIL SENDER EXCEPTION: ', e, instance)
