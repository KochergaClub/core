# Generated by Django 2.1.5 on 2019-02-07 16:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0005_auto_20190207_1903'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='training',
            options={
                'ordering': ['-date'],
                'verbose_name': 'Тренинг',
                'verbose_name_plural': 'Тренинги',
            },
        ),
        migrations.AlterUniqueTogether(
            name='ticket', unique_together={('training', 'email')},
        ),
    ]
