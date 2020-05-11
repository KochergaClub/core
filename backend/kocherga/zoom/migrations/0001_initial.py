# Generated by Django 3.0.5 on 2020-05-05 22:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meeting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('zoom_id', models.CharField(max_length=20)),
                ('zoom_uuid', models.CharField(max_length=100, unique=True)),
                ('participants_count', models.IntegerField(null=True)),
                ('duration', models.IntegerField(null=True)),
            ],
        ),
    ]