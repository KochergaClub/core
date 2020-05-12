# Generated by Django 3.0.5 on 2020-05-08 01:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('zoom', '0005_optional_end_time'),
    ]

    operations = [
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zoom_id', models.CharField(max_length=40)),
                ('name', models.CharField(max_length=256)),
                ('user_email', models.CharField(max_length=256)),
                ('join_time', models.DateTimeField()),
                ('leave_time', models.DateTimeField()),
                ('duration', models.IntegerField()),
                ('meeting', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participants', to='zoom.Meeting')),
            ],
        ),
    ]
