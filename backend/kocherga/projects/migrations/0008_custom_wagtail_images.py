# Generated by Django 3.0.5 on 2020-06-09 19:22

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('kocherga_wagtail', '0003_images_data'),
        ('projects', '0007_projectindexpage'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='projectpage',
            options={'verbose_name': 'Проект', 'verbose_name_plural': 'Проекты'},
        ),
        migrations.AlterField(
            model_name='projectpage',
            name='activity_summary',
            field=models.TextField(blank=True, null=True, verbose_name='Периодичность'),
        ),
        migrations.AlterField(
            model_name='projectpage',
            name='body',
            field=wagtail.core.fields.RichTextField(blank=True, verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='projectpage',
            name='image',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='kocherga_wagtail.CustomImage'),
        ),
        migrations.AlterField(
            model_name='projectpage',
            name='is_active',
            field=models.BooleanField(verbose_name='Активный'),
        ),
        migrations.AlterField(
            model_name='projectpage',
            name='summary',
            field=models.TextField(verbose_name='Короткое описание'),
        ),
    ]