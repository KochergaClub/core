# Generated by Django 2.2 on 2019-04-05 15:26

from django.db import migrations, models
import django.utils.timezone

from datetime import datetime
from kocherga.dateutils import TZ


def fill_dt_fields(apps, schema_editor):
    Event = apps.get_model('events', 'Event')
    for event in Event.objects.all():
        event.created = datetime.fromtimestamp(event.created_ts, TZ)
        event.updated = datetime.fromtimestamp(event.updated_ts, TZ)
        event.start = datetime.fromtimestamp(event.start_ts, TZ)
        event.end = datetime.fromtimestamp(event.end_ts, TZ)
        if event.asked_for_visitors_ts:
            event.asked_for_visitors = datetime.fromtimestamp(
                event.asked_for_visitors_ts, TZ
            )

        event.save()


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_auto_20190217_1432'),
    ]

    placeholder_dt = datetime(2000, 1, 1, tzinfo=TZ)

    operations = [
        # new datetime fields
        migrations.AddField(
            model_name='event',
            name='created',
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='updated',
            field=models.DateTimeField(auto_now=True, default=placeholder_dt),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='end',
            field=models.DateTimeField(default=placeholder_dt),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='start',
            field=models.DateTimeField(default=placeholder_dt),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='asked_for_visitors',
            field=models.DateTimeField(blank=True, null=True),
        ),
        # nullable old ts fields for easier migration
        migrations.AlterField(
            model_name='event',
            name='updated_ts',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='start_ts',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='end_ts',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='asked_for_visitors_ts',
            field=models.IntegerField(blank=True, null=True),
        ),
        # populate new datetime fields
        migrations.RunPython(fill_dt_fields),
        # unrelated to datetime migration - blank fields for fields which should be blank
        migrations.AlterField(
            model_name='event', name='description', field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='image',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='event', name='summary', field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='visitors',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='vk_image',
            field=models.CharField(blank=True, max_length=32, null=True),
        ),
    ]
