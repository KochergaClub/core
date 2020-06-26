# Generated by Django 2.2.5 on 2019-10-18 22:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0019_blank_prototype_fields'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_type',
            field=models.CharField(
                choices=[
                    ('public', 'public'),
                    ('private', 'private'),
                    ('unknown', 'unknown'),
                ],
                default='unknown',
                max_length=40,
            ),
        ),
    ]
