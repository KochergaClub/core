# Generated by Django 2.2 on 2019-04-26 16:57

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0002_auto_20190426_1813'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectpage',
            name='body',
            field=wagtail.core.fields.RichTextField(blank=True),
        ),
        migrations.AlterField(
            model_name='projectpage',
            name='image',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='wagtailimages.Image'),
        ),
    ]