# Generated by Django 2.2.5 on 2019-12-17 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cm2', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='stored_value',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]