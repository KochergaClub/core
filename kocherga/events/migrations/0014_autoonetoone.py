# Generated by Django 2.2 on 2019-06-01 00:46

import annoying.fields
from django.db import migrations
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0013_announcement_models'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fbannouncement',
            name='event',
            field=annoying.fields.AutoOneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='fb_announcement', to='events.Event'),
        ),
        migrations.AlterField(
            model_name='timepadannouncement',
            name='event',
            field=annoying.fields.AutoOneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='timepad_announcement', to='events.Event'),
        ),
        migrations.AlterField(
            model_name='vkannouncement',
            name='event',
            field=annoying.fields.AutoOneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='vk_announcement', to='events.Event'),
        ),
    ]
