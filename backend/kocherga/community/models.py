from django.contrib.auth import get_user_model
from django.db import models
from kocherga.django.managers import RelayQuerySet
from wagtail.core.fields import RichTextField

User = get_user_model()


class Lead(models.Model):
    name = models.CharField(max_length=250)
    description = RichTextField(blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL
    )

    objects = RelayQuerySet.as_manager()

    class Meta:
        default_permissions = ()
