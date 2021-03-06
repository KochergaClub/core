# Generated by Django 2.2.5 on 2019-10-21 01:21

from django.db import migrations, models
import kocherga.events.models.event


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0029_event_uuid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='google_id',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='google_link',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AlterField(
            model_name='event',
            name='uuid',
            field=models.SlugField(
                default=kocherga.events.models.event.generate_uuid, unique=True
            ),
        ),
    ]
