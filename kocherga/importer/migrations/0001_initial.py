# Generated by Django 2.1.5 on 2019-01-09 18:41

from django.db import migrations, models
import kocherga.importer.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='LogEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=100)),
                ('start_dt', models.DateTimeField(default=kocherga.importer.models.dt_now)),
                ('end_dt', models.DateTimeField(null=True)),
                ('exception', models.TextField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='State',
            fields=[
                ('name', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('until_dt', models.DateTimeField(null=True)),
                ('last_dt', models.DateTimeField(null=True)),
                ('last_exception', models.CharField(max_length=1024, null=True)),
            ],
        ),
    ]
