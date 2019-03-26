# Generated by Django 2.1.7 on 2019-03-19 23:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0007_verbose_names'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='cm_customer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='staff_member', to='cm.Customer'),
        ),
    ]