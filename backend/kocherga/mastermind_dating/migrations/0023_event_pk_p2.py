# Generated by Django 2.2.5 on 2019-10-19 22:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mastermind_dating', '0022_event_pk_p1'),
    ]

    operations = [
        migrations.RemoveField(model_name='cohort', name='event',),
    ]
