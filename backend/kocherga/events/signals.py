import logging

logger = logging.getLogger(__name__)

import reversion.signals
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver

from . import channels, models


@receiver(reversion.signals.post_revision_commit)
def cb_flush_new_revisions(sender, revision, versions, **kwargs):
    def on_commit():
        logger.info('Checking for new event revisions')
        for version in versions:
            if version.content_type.model_class() == models.Event:
                logger.info('Notifying about new event revisions')
                channels.notify_slack_by_event_version(version.pk)
                break

    # We use ATOMIC_REQUESTS (FIXME - do we really?), so we shouldn't notify the worker until transaction commits.
    # Otherwise the worker could query the DB too early and won't find the version object.
    transaction.on_commit(on_commit)


@receiver(post_save, sender=models.Event)
def cb_google_export(sender, instance: models.Event, created, **kwargs):
    def on_commit():
        channels.export_event_to_google(instance.pk)

    transaction.on_commit(on_commit)
