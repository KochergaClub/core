# Generated by Django 3.0.5 on 2020-07-19 15:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('kocherga_wagtail', '0005_public_images'),
        ('tilda', '0008_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='tildapage',
            name='og_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='kocherga_wagtail.CustomImage'),
        ),
    ]
