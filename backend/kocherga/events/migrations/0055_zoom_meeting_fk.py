# Generated by Django 3.0.5 on 2020-05-05 23:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('zoom', '0001_initial'),
        ('events', '0054_dt_indices_and_cleanups'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='zoom_meeting',
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='events',
                to='zoom.Meeting',
            ),
        ),
        migrations.AlterField(
            model_name='event',
            name='pricing_type',
            field=models.CharField(
                choices=[('anticafe', 'anticafe'), ('free', 'free')],
                default='free',
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name='event',
            name='realm',
            field=models.CharField(
                choices=[('offline', 'offline'), ('online', 'online')],
                default='online',
                max_length=40,
            ),
        ),
    ]
