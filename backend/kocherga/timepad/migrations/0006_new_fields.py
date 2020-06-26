# Generated by Django 2.2.5 on 2019-09-30 12:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('timepad', '0005_auto_20190223_1656'),
    ]

    operations = [
        migrations.AddField(
            model_name='event', name='ends_at', field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='event', name='starts_at', field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='created_at',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='order',
            name='subscribed_to_newsletter',
            field=models.BooleanField(null=True),
        ),
    ]
