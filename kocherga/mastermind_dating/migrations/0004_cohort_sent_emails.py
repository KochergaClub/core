# Generated by Django 2.1.7 on 2019-02-23 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mastermind_dating', '0003_auto_20190223_2102'),
    ]

    operations = [
        migrations.AddField(
            model_name='cohort',
            name='sent_emails',
            field=models.BooleanField(default=False),
        ),
    ]
