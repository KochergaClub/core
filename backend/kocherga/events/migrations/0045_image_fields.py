# Generated by Django 2.2.5 on 2020-02-01 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0044_event_pricing_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='fbannouncement',
            name='error_screenshot',
            field=models.ImageField(blank=True, null=True, upload_to='events/announcement/fb/error_screenshot/'),
        ),
        migrations.AddField(
            model_name='weeklydigest',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='events/weekly_digest/'),
        ),
    ]
