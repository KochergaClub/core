# Generated by Django 3.0.5 on 2020-07-20 01:25

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