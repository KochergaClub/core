# Generated by Django 2.2 on 2019-06-15 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0014_autoonetoone'),
    ]

    operations = [
        migrations.AddField(
            model_name='fbannouncement',
            name='added_to_main_page',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='fbannouncement',
            name='shared_to_main_page',
            field=models.BooleanField(default=False),
        ),
    ]
