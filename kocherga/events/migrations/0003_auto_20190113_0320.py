# Generated by Django 2.1.5 on 2019-01-13 00:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_auto_20190111_2006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='events.Event'),
        ),
    ]
