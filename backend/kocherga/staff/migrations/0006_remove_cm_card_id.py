# Generated by Django 2.1.5 on 2019-01-15 21:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0005_fill_cm_customer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='member',
            name='cm_card_id',
        ),
    ]