# Generated by Django 2.1.7 on 2019-03-18 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0016_auto_20190319_0133'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trainer',
            name='post_survey_collected',
        ),
        migrations.AddField(
            model_name='training',
            name='post_survey_collected',
            field=models.BooleanField(default=False),
        ),
    ]
