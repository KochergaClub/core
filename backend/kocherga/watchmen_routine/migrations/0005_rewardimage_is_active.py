# Generated by Django 2.1.5 on 2019-01-15 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('watchmen_routine', '0004_auto_20190115_2243'),
    ]

    operations = [
        migrations.AddField(
            model_name='rewardimage',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
