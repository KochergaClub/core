# Generated by Django 2.1.7 on 2019-02-24 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mastermind_dating', '0005_desc_is_not_null'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='voted_for',
            field=models.BooleanField(default=False),
        ),
    ]
