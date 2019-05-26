# Generated by Django 2.2 on 2019-05-25 22:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('zadarma', '0005_pbx_fk'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='call',
            name='pbx_call_id',
        ),
        migrations.AlterField(
            model_name='call',
            name='pbx_call_fk',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='zadarma.PbxCall'),
        ),
    ]
