# Generated by Django 2.2 on 2019-05-04 14:20

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0041_group_collection_permissions_verbose_name_plural'),
        ('contenttypes', '0002_remove_content_type_name'),
        ('wagtailredirects', '0006_redirect_increase_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wagtailforms', '0003_capitalizeverbose'),
        ('pages', '0003_auto_20190504_1719'),
    ]

    operations = [
        migrations.RenameModel(old_name='HomePage', new_name='FreeFormPage',),
    ]
