# Generated by Django 2.2.5 on 2019-10-21 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0032_googlecalendar_public_only'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='invite_creator',
            field=models.BooleanField(default=False),
        ),
    ]