# Generated by Django 2.2 on 2019-04-27 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_auto_20190426_1957'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectpage',
            name='acitivity_summary',
            field=models.TextField(blank=True, null=True),
        ),
    ]