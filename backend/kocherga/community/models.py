import enum

import reversion
from django.contrib.auth import get_user_model
from django.db import models
from kocherga.comments.models import Commentable
from kocherga.django.managers import RelayQuerySet

User = get_user_model()


@reversion.register()
class Lead(Commentable, models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.SET_NULL, related_name='+'
    )
    curated_by = models.ForeignKey(
        User,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )

    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Активный'
        INACTIVE = 'INACTIVE', 'Неактивный'

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default='ACTIVE',
        db_index=True,
    )

    objects = RelayQuerySet.as_manager()

    class Meta:
        default_permissions = ()
        ordering = ['-pk']
