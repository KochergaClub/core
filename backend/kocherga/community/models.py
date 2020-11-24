from django.db import models
from kocherga.django.managers import RelayQuerySet
from wagtail.core.fields import RichTextField


class Lead(models.Model):
    name = models.CharField(max_length=250)
    description = RichTextField(blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    objects = RelayQuerySet.as_manager()

    class Meta:
        default_permissions = ()
