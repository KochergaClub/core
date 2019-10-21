import logging
logger = logging.getLogger(__name__)

import channels.layers
from asgiref.sync import async_to_sync

from django.db import transaction
from django.dispatch import receiver
from django.db.models.signals import post_save

import reversion.signals

from .models import Event, VkAnnouncement


def channel_send(channel: str, message):
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.send)(channel, message)


@receiver(reversion.signals.post_revision_commit)
def cb_flush_new_revisions(sender, revision, versions, **kwargs):

    def on_commit():
        logger.info('Checking for new event revisions')
        for version in versions:
            if version.content_type.model_class() == Event:
                logger.info('Notifying about new event revisions')
                channel_send("events-slack-notify", {
                    "type": "notify_by_version",
                    "version_id": version.pk,
                })
                break

    # We use ATOMIC_REQUESTS, so we shouldn't notify the worker until transaction commits.
    # Otherwise the worker could query the DB too early and won't find the version object.
    transaction.on_commit(on_commit)


def channel_send_google_export(event_pk):
    channel_send("events-google-export", {
        "type": "export_event",
        "event_pk": event_pk,
    })


@receiver(post_save, sender=Event)
def cb_google_export(sender, instance, created, **kwargs):

    def on_commit():
        channel_send_google_export(instance.pk)

    transaction.on_commit(on_commit)


@receiver(post_save, sender=VkAnnouncement)
def cb_google_export_on_vk_announcement(sender, instance, created, **kwargs):

    def on_commit():
        channel_send_google_export(instance.event.pk)

    transaction.on_commit(on_commit)
