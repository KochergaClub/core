# Generated by Django 2.2.5 on 2019-10-21 17:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0030_google_id_nullable'),
    ]

    operations = [
        migrations.CreateModel(
            name='GoogleCalendar',
            fields=[
                (
                    'id',
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                ('calendar_id', models.CharField(db_index=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='GoogleEvent',
            fields=[
                (
                    'id',
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name='ID',
                    ),
                ),
                ('google_id', models.CharField(max_length=100, unique=True)),
                (
                    'event',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name='google_events',
                        to='events.Event',
                    ),
                ),
                (
                    'google_calendar',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='google_events',
                        to='events.GoogleCalendar',
                    ),
                ),
            ],
        ),
    ]
