# Generated by Django 3.0.10 on 2020-11-02 00:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0064_notion_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='training',
            name='new_ticket_email',
            field=models.CharField(choices=[('training', 'training'), ('wait-for-notion', 'wait-for-notion')], default='training', max_length=40),
        ),
        migrations.AddField(
            model_name='training',
            name='notion_created_email',
            field=models.CharField(blank=True, choices=[('notion-template', 'notion-template')], max_length=40),
        ),
        migrations.AddField(
            model_name='training',
            name='promocode_email',
            field=models.CharField(blank=True, choices=[('notion-template', 'notion-template')], max_length=40),
        ),
    ]