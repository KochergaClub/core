# Generated by Django 2.1.5 on 2019-01-15 21:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kocherga_auth', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={
                'verbose_name': 'Пользователь',
                'verbose_name_plural': 'Пользователи',
            },
        ),
    ]
