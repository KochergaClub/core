# Generated by Django 2.1.5 on 2019-01-10 14:40

from django.db import migrations, models, connection
import kocherga.importer.models


class Migration(migrations.Migration):

    dependencies = [
        ('importer', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='state',
            options={},
        ),
        migrations.AddField(
            model_name='state',
            name='last_dt',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='state',
            name='until_dt',
            field=models.DateTimeField(null=True),
        ),
        migrations.RemoveField(
            model_name='state',
            name='last_ts',
        ),
        migrations.RemoveField(
            model_name='state',
            name='until_ts',
        ),
        migrations.AlterModelOptions(
            name='logentry',
            options={},
        ),
        migrations.AddField(
            model_name='logentry',
            name='start_dt',
            field=models.DateTimeField(default=kocherga.importer.models.dt_now),
        ),
        migrations.AddField(
            model_name='logentry',
            name='end_dt',
            field=models.DateTimeField(null=True),
        ),
        migrations.RemoveField(
            model_name='logentry',
            name='start_ts',
        ),
        migrations.RemoveField(
            model_name='logentry',
            name='end_ts',
        ),
    ]
