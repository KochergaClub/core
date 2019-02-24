from django.db import models

from kocherga.events.models import Event as KchEvent

from .user import User as MmUser

class Cohort(models.Model):
    event = models.OneToOneField(KchEvent, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    sent_emails = models.BooleanField(default=False)

    def populate_from_event(self):
        if not self.event:
            raise Exception("Cohort doesn't have an associated event")

        for user in self.event.registered_users():
            MmUser.objects.create(
                user=user,
                cohort=self,
            )
            # TODO - remove everyone else (people can cancel their registrations)

    def send_invite_emails(self, force=False):
        if self.sent_emails and not force:
            raise Exception("Already sent invite emails")

        for user in self.users.all():
            user.send_invite_email()

        self.sent_emails = True
        self.save()
