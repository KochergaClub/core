import logging

logger = logging.getLogger(__name__)

from django.db import models
from django.contrib.auth import get_user_model

KchUser = get_user_model()


class TelegramUser(models.Model):
    user = models.OneToOneField(
        KchUser,
        on_delete=models.CASCADE,
        related_name='mastermind_dating_telegram_user',
    )

    telegram_uid = models.CharField(max_length=100, unique=True)
    chat_id = models.IntegerField(unique=True)

    def get_participant(self):
        """
        Find the Participant object which correspond to this TelegramUser.

        Note that if someone participates in mastermind dating multiple times, they'll have multiple Participant
        objects but at most one TelegramUser. So we need to discriminate among multiple Participant objects somehow.
        """
        participant = self.user.mastermind_dating_participants.order_by('id').last()
        return participant
