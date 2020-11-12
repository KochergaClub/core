# Generated by Django 3.1.3 on 2020-11-12 19:43

import django.db.models.deletion
import wagtail.core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0052_pagelogentry'),
        ('django', '0001_settings'),
    ]

    operations = [
        migrations.AddField(
            model_name='settings',
            name='telegram_images_collection',
            field=models.ForeignKey(default=wagtail.core.models.get_root_collection_id, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='wagtailcore.collection'),
        ),
        migrations.AddField(
            model_name='settings',
            name='weekly_digest_images_collection',
            field=models.ForeignKey(default=wagtail.core.models.get_root_collection_id, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='wagtailcore.collection'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='default_events_images_collection',
            field=models.ForeignKey(default=wagtail.core.models.get_root_collection_id, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='wagtailcore.collection'),
        ),
        migrations.AlterField(
            model_name='settings',
            name='default_events_vk_images_collection',
            field=models.ForeignKey(default=wagtail.core.models.get_root_collection_id, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='wagtailcore.collection'),
        ),
    ]
