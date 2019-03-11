# Generated by Django 2.1.5 on 2019-01-11 14:42

from django.db import migrations, models
import django.db.models.deletion
from kocherga.events.models.event import ts_now


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('google_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('google_link', models.CharField(max_length=1024)),
                ('start_ts', models.IntegerField()),
                ('end_ts', models.IntegerField()),
                ('created_ts', models.IntegerField(default=ts_now)),
                ('updated_ts', models.IntegerField()),
                ('creator', models.CharField(max_length=255)),
                ('title', models.CharField(max_length=255)),
                ('summary', models.TextField()),
                ('description', models.TextField()),
                ('deleted', models.BooleanField(default=False)),
                ('location', models.CharField(blank=True, max_length=255)),
                ('is_master', models.BooleanField(default=False)),
                ('master_id', models.CharField(blank=True, max_length=100)),
                ('prototype_id', models.IntegerField(db_index=True, null=True)),
                ('visitors', models.CharField(max_length=100, null=True)),
                ('asked_for_visitors_ts', models.IntegerField(null=True)),
                ('event_type', models.CharField(default='unknown', max_length=40)),
                ('vk_group', models.CharField(blank=True, max_length=40)),
                ('fb_group', models.CharField(blank=True, max_length=40)),
                ('image', models.CharField(max_length=32, null=True)),
                ('vk_image', models.CharField(max_length=32, null=True)),
                ('ready_to_post', models.BooleanField(default=False)),
                ('posted_fb', models.CharField(blank=True, max_length=1024)),
                ('posted_timepad', models.CharField(blank=True, max_length=1024)),
                ('posted_vk', models.CharField(blank=True, max_length=1024)),
                ('timepad_category_code', models.CharField(blank=True, max_length=40)),
                ('timepad_prepaid_tickets', models.BooleanField(default=False)),
                ('timing_description_override', models.CharField(blank=True, max_length=255)),
            ],
            options={
                'db_table': 'events',
            },
        ),
        migrations.CreateModel(
            name='EventPrototype',
            fields=[
                ('prototype_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('location', models.CharField(blank=True, max_length=255)),
                ('summary', models.TextField(blank=True)),
                ('description', models.TextField(blank=True)),
                ('timepad_category_code', models.CharField(blank=True, max_length=40)),
                ('timepad_prepaid_tickets', models.BooleanField(default=False)),
                ('timing_description_override', models.CharField(blank=True, max_length=255)),
                ('vk_group', models.CharField(blank=True, max_length=40)),
                ('fb_group', models.CharField(blank=True, max_length=40)),
                ('weekday', models.IntegerField()),
                ('hour', models.IntegerField()),
                ('minute', models.IntegerField()),
                ('length', models.IntegerField()),
                ('image', models.CharField(max_length=32, null=True)),
                ('active', models.BooleanField(default=True)),
                ('canceled_dates', models.TextField()),
            ],
            options={
                'db_table': 'event_prototypes',
            },
        ),
        migrations.CreateModel(
            name='EventPrototypeTag',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
                ('prototype', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.EventPrototype')),
            ],
            options={
                'db_table': 'event_prototype_tags',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.Event')),
            ],
            options={
                'db_table': 'event_tags',
            },
        ),
        migrations.AlterUniqueTogether(
            name='tag',
            unique_together={('event', 'name')},
        ),
        migrations.AlterUniqueTogether(
            name='eventprototypetag',
            unique_together={('prototype', 'name')},
        ),
    ]
