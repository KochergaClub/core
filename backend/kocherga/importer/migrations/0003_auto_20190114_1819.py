# Generated by Django 2.1.5 on 2019-01-14 15:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('importer', '0002_ts2dt_20190110_1740'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='logentry',
            table='importers_log',
        ),
    ]