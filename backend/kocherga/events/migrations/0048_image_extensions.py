# Generated by Django 2.2.5 on 2020-02-02 13:03

import logging

logger = logging.getLogger(__name__)

from django.db import migrations
import os.path
import os
import imghdr


def add_image_extensions(apps, schema_editor):
    for model_name in ('Event', 'EventPrototype', 'VkAnnouncement'):
        model_class = apps.get_model('events', model_name)
        for obj in model_class.objects.all():
            if not obj.image:
                continue

            image = obj.image
            (root, ext) = os.path.splitext(image.file.name)
            if ext:
                continue  # already has extension

            image_type = imghdr.what(image.file.path)
            if image_type == 'png':
                new_ext = '.png'
            elif image_type == 'jpeg':
                new_ext = '.jpg'
            else:
                logger.info(f'Unknown image type {image_type}, skipping')
                continue

            os.rename(image.file.path, image.file.path + new_ext)
            image.file.name += new_ext
            image.save()


def nop(x, y):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0047_wagtail_images_p2'),
    ]

    operations = [
        migrations.RunPython(add_image_extensions, nop),
    ]
