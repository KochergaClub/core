# Generated by Django 2.2 on 2019-08-28 16:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0017_remove_old_event_fields'),
    ]

    operations = [
        migrations.RemoveField(model_name='event', name='is_master',),
        migrations.RemoveField(model_name='event', name='master_id',),
    ]
