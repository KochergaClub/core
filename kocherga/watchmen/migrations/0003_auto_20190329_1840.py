# Generated by Django 2.1.7 on 2019-03-29 15:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('watchmen', '0002_auto_20190113_0320'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='scheduleitem',
            options={'permissions': (('manage', 'Может управлять админским расписанием'),)},
        ),
    ]
