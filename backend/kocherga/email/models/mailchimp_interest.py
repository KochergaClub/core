from django.db import models
from .mailchimp_category import MailchimpCategory


class MailchimpInterest(models.Model):
    interest_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=1024)
    subscriber_count = models.IntegerField()
    category = models.ForeignKey(MailchimpCategory, on_delete=models.PROTECT, related_name='interests')
