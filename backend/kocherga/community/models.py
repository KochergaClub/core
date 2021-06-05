import reversion
from django.contrib.auth import get_user_model
from django.db import models
from kocherga.comments.models import Commentable
from kocherga.django.managers import RelayQuerySet
from wagtail.search import index

User = get_user_model()


@reversion.register()
class Lead(index.Indexed, Commentable, models.Model):
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

    events = models.ManyToManyField('events.Event', related_name='community_leads')

    objects = RelayQuerySet.as_manager()

    search_fields = [
        index.SearchField('name', partial_match=True, boost=10),
        index.SearchField('description'),
        index.FilterField('status'),
        index.FilterField('curated_by_id'),
    ]

    class Meta:
        default_permissions = ()
        ordering = ['-pk']


@reversion.register()
class Initiative(index.Indexed, Commentable, models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        User,
        blank=True,
        null=True,
        on_delete=models.SET_NULL,
        related_name='+',
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

    leads = models.ManyToManyField(Lead, related_name='initiatives')
    event = models.ForeignKey(
        'events.Event',
        on_delete=models.SET_NULL,
        related_name='community_initiatives',
        null=True,
        blank=True,
    )

    objects = RelayQuerySet.as_manager()

    search_fields = [
        index.SearchField('title', partial_match=True, boost=10),
        index.SearchField('description'),
        index.FilterField('status'),
        index.FilterField('curated_by_id'),
    ]

    class Meta:
        default_permissions = ()
        ordering = ['-pk']
