# Generated by Django 2.2.5 on 2019-12-15 19:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0043_event_registration_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='pricing_type',
            field=models.CharField(
                choices=[('anticafe', 'anticafe'), ('free', 'free')],
                default='anticafe',
                max_length=20,
            ),
        ),
    ]
