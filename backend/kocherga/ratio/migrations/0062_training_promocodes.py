# Generated by Django 3.0.10 on 2020-11-01 20:32

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0061_non_null_discounts'),
    ]

    operations = [
        migrations.AddField(
            model_name='training',
            name='discount_by_email',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name="Сумма скидки одноразового промокода по E-mail'у"),
        ),
        migrations.AddField(
            model_name='training',
            name='discount_percent_by_email',
            field=models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name="Процент скдики одноразового промокода по E-mail'у"),
        ),
        migrations.AddField(
            model_name='training',
            name='promocodes',
            field=models.ManyToManyField(related_name='trainings', to='ratio.Promocode'),
        ),
    ]
