# Generated by Django 2.1.5 on 2019-01-09 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Call',
            fields=[
                ('call_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('pbx_call_id', models.CharField(max_length=100)),
                ('ts', models.DateTimeField()),
                ('call_type', models.CharField(max_length=15)),
                ('disposition', models.CharField(max_length=40)),
                ('clid', models.CharField(blank=True, max_length=100)),
                ('destination', models.CharField(max_length=20)),
                ('sip', models.CharField(max_length=100)),
                ('seconds', models.IntegerField()),
                ('is_recorded', models.IntegerField()),
                ('watchman', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'zadarma_calls',
#                'managed': False,
            },
        ),
    ]