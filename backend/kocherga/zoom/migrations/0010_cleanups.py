# Generated by Django 3.0.5 on 2020-05-13 01:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('zoom', '0009_meeting_instances'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='meeting',
            name='participants_count',
        ),
        migrations.AlterField(
            model_name='participant',
            name='meeting_instance',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participants', to='zoom.MeetingInstance'),
        ),
    ]