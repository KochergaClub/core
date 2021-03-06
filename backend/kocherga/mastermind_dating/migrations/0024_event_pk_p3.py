# Generated by Django 2.2.5 on 2019-10-19 23:04

from django.db import migrations, models
import django.db.models.deletion


def fill_event_fk(apps, schema_editor):
    Event = apps.get_model('events', 'Event')

    for model_name in ('Cohort',):
        model_class = apps.get_model('mastermind_dating', model_name)
        for obj in model_class.objects.all():
            if not obj.event_google_id:
                continue
            event = Event.objects.get(google_id=obj.event_google_id)
            obj.event = event
            obj.save()


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0027_event_pk_p5'),
        ('mastermind_dating', '0023_event_pk_p2'),
    ]

    operations = [
        migrations.AddField(
            model_name='cohort',
            name='event',
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='+',
                to='events.Event',
            ),
        ),
        migrations.RunPython(fill_event_fk),
    ]
