# Generated by Django 2.2 on 2019-07-27 22:14

from django.db import migrations, models


def populate_invite_email_sent(apps, schema_editor):
    User = apps.get_model('mastermind_dating', 'User')

    for user in User.objects.all():
        if user.cohorts.count() == 0:
            # user doesn't have any cohorts, that's weird but whatever
            continue
        if user.cohorts.count() > 1:
            raise Exception("User in multiple cohorts, can't proceed")
        cohort = user.cohorts.first()
        user.invite_email_sent = cohort.sent_emails
        user.save()


class Migration(migrations.Migration):

    dependencies = [
        ('mastermind_dating', '0010_user_multiple_cohorts_p2'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='invite_email_sent',
            field=models.BooleanField(default=False),
        ),
        migrations.RunPython(populate_invite_email_sent, lambda x, y: None)
    ]
