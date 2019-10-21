from django.conf import settings
from django.db import migrations


def fill_event_fk(apps, schema_editor):
    Event = apps.get_model('events', 'Event')

    for model_name in ('Ticket', 'Tag', 'VkAnnouncement', 'FbAnnouncement', 'TimepadAnnouncement'):
        model_class = apps.get_model('events', model_name)
        for obj in model_class.objects.all():
            event = Event.objects.get(google_id=obj.event_google_id)
            obj.event = event
            obj.save()


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0026_event_pk_p4'),
    ]

    operations = [
        migrations.RunPython(
            fill_event_fk
        ),
    ]
