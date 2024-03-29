# Generated by Django 3.2.4 on 2021-06-06 18:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('kocherga_wagtail', '0001_squash_2021'),
        ('projects', '0001_squash_2021'),
    ]

    operations = [
        migrations.CreateModel(
            name='Permissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'permissions': [('manage_chats', 'Can manage all telegram chats'), ('view_all_chats', 'Can list and access all telegram chats'), ('post_to_chats', 'Can post to any telegram chats via bot')],
                'managed': False,
                'default_permissions': (),
            },
        ),
        migrations.CreateModel(
            name='Auth',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=1024)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('chat_id', models.BigIntegerField(blank=True, null=True, unique=True)),
                ('username', models.CharField(blank=True, max_length=40)),
                ('invite_link', models.URLField(blank=True)),
                ('force_public', models.BooleanField(default=False)),
                ('delisted', models.BooleanField(default=False)),
                ('title', models.CharField(blank=True, editable=False, max_length=255)),
                ('photo_file_id', models.CharField(blank=True, editable=False, max_length=255)),
                ('photo', models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='kocherga_wagtail.customimage')),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='telegram_chats', to='projects.projectpage')),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
    ]
