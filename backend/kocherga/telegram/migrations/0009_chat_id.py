# Generated by Django 3.1.3 on 2020-12-06 03:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('telegram', '0008_invite_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Permissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'permissions': [('manage_chats', 'Can manage all telegram chats')],
                'managed': False,
                'default_permissions': (),
            },
        ),
        migrations.DeleteModel(
            name='Manage',
        ),
        migrations.RemoveField(
            model_name='chat',
            name='invite_code',
        ),
        migrations.AddField(
            model_name='chat',
            name='chat_id',
            field=models.BigIntegerField(blank=True, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='chat',
            name='invite_link',
            field=models.URLField(blank=True),
        ),
    ]