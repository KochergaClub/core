from django.db import models


class MailchimpCategory(models.Model):
    category_id = models.CharField(max_length=20, unique=True)
    title = models.CharField(max_length=1024)
    type = models.CharField(
        max_length=40,
        choices=[
            ('checkboxes', 'checkboxes'),
            ('dropdown', 'dropdown'),
            ('radio', 'radio'),
            ('hidden', 'hidden'),
        ]
    )
