# Generated by Django 2.1.5 on 2019-02-07 18:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0006_auto_20190207_1917'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='training',
            options={'ordering': ['-date'], 'permissions': (('can_control', 'Может управлять тренингами'),), 'verbose_name': 'Тренинг', 'verbose_name_plural': 'Тренинги'},
        ),
    ]
