# Generated by Django 3.0.5 on 2020-05-05 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zoom', '0002_meeting_times'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='join_url',
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
