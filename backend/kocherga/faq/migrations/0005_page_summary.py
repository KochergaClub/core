# Generated by Django 2.2.5 on 2019-12-04 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('faq', '0004_entry_page_required'),
    ]

    operations = [
        migrations.AddField(
            model_name='faqpage',
            name='summary',
            field=models.TextField(blank=True, verbose_name='Короткое описание'),
        ),
    ]
