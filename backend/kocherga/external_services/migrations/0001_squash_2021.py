# Generated by Django 3.2.4 on 2021-06-06 18:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Permissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'permissions': (('view_access', 'view external service access data'),),
                'managed': False,
                'default_permissions': (),
            },
        ),
    ]