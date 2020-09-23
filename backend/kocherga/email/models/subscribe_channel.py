import hashlib

from kocherga.django.managers import RelayQuerySet

from .mailchimp_interest import MailchimpInterest
from django.db import models

import kocherga.mailchimp


class SubscribeChannel(models.Model):
    slug = models.SlugField()
    interests = models.ManyToManyField(MailchimpInterest)

    def subscribe_email(self, email: str):
        LIST_ID = kocherga.mailchimp.MAIN_LIST_ID
        subscriber_hash = hashlib.md5(email.lower().encode()).hexdigest()

        SubscribeChannelLog.objects.create(channel=self, email=email.lower())

        kocherga.mailchimp.api_call(
            'PUT',
            f'lists/{LIST_ID}/members/{subscriber_hash}',
            {
                'email_type': 'html',
                'email_address': email,
                'status': 'subscribed',
                'interests': {k.interest_id: True for k in self.interests.all()},
                'status_if_new': 'subscribed',
            },
        )


class SubscribeChannelLog(models.Model):
    channel = models.ForeignKey(SubscribeChannel, on_delete=models.CASCADE, related_name='log')
    dt = models.DateTimeField(auto_now_add=True)
    email = models.EmailField()

    objects = RelayQuerySet.as_manager()
