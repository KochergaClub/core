# Generated by Django 3.2.4 on 2021-06-06 17:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('kocherga_wagtail', '0006_kochergapage'),
        ('blog', '0005_custom_wagtail_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpostauthor',
            name='image',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='kocherga_wagtail.customimage'),
        ),
    ]