from django.db import models
from .mailchimp_interest import MailchimpInterest


class SubscribeChannel(models.Model):
    slug = models.SlugField()
    interests = models.ManyToManyField(MailchimpInterest)

    def subscribe_email(self, email: str):
        ...
