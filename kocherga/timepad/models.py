from django.db import models
from django.conf import settings

# Create your models here.

class Event(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

# Timepad's own data model includes Tickets inside each Order, and email/first_name/last_name are actually ticket's properties.
# But we don't use multiregistrations, so it doesn't matter much for now.
class Order(models.Model):
    id = models.IntegerField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='timepad_orders',
    )
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    status = models.CharField(max_length=40)
