# Generated by Django 2.1.5 on 2019-01-14 15:40

from django.db import migrations, models
import kocherga.analytics.timeclub24.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Timeclub24Visitors',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('ts', models.DateTimeField(default=kocherga.analytics.timeclub24.models.dt_now)),
                ('venue', models.CharField(max_length=100)),
                ('visitors', models.IntegerField()),
            ],
            options={
                'db_table': 'timeclub24_visitors',
            },
        ),
        migrations.AlterUniqueTogether(
            name='timeclub24visitors',
            unique_together={('ts', 'venue')},
        ),
    ]