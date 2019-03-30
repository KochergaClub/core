# Generated by Django 2.1.5 on 2019-01-11 18:29

from django.db import migrations, models
import kocherga.watchmen.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ScheduleItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('shift', models.CharField(choices=[(kocherga.watchmen.models.ShiftType(1), 'MORNING_V1'), (kocherga.watchmen.models.ShiftType(2), 'EVENING_V1'), (kocherga.watchmen.models.ShiftType(3), 'MORNING'), (kocherga.watchmen.models.ShiftType(4), 'MIDDAY'), (kocherga.watchmen.models.ShiftType(5), 'EVENING'), (kocherga.watchmen.models.ShiftType(6), 'NIGHT')], max_length=20)),
                ('watchman', models.CharField(db_index=True, max_length=100)),
            ],
            options={
                'db_table': 'watchmen_schedule',
            },
        ),
        migrations.AlterUniqueTogether(
            name='scheduleitem',
            unique_together={('date', 'shift')},
        ),
    ]
