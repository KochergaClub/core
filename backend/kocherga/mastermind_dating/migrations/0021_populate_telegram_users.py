# Generated by Django 2.2 on 2019-07-28 20:31

from django.db import migrations


def fill_telegram_users(apps, schema_editor):
    Participant = apps.get_model('mastermind_dating', 'Participant')
    TelegramUser = apps.get_model('mastermind_dating', 'TelegramUser')

    for participant in Participant.objects.all():
        if not participant.chat_id and not participant.telegram_uid:
            continue
        TelegramUser.objects.create(
            user=participant.user,
            telegram_uid=participant.telegram_uid,
            chat_id=participant.chat_id,
        )


class Migration(migrations.Migration):

    dependencies = [
        ('mastermind_dating', '0020_unique_participants'),
    ]

    operations = [migrations.RunPython(fill_telegram_users, lambda *args: None)]
