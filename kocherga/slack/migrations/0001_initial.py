# Generated by Django 2.2 on 2019-08-15 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted', models.BooleanField(default=False)),
                ('slack_id', models.CharField(max_length=40, unique=True)),
                ('email', models.CharField(max_length=255)),
                ('image_url', models.CharField(max_length=1024)),
            ],
        ),
    ]
