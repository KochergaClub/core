# Generated by Django 3.0.10 on 2020-10-31 02:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0054_eternal_trainings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='training',
            name='telegram_link',
            field=models.URLField(blank=True, verbose_name='Телеграм-чат'),
        ),
    ]