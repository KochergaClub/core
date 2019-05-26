# Generated by Django 2.2 on 2019-05-25 22:39

import datetime
from django.db import migrations, models
import django.db.models.deletion


def fill_pbx_ts(apps, schema_editor):
    PbxCall = apps.get_model('zadarma', 'PbxCall')
    for pbx_call in PbxCall.objects.all():
        call = pbx_call.calls.get(sip=0)
        pbx_call.ts = call.ts
        pbx_call.save()


class Migration(migrations.Migration):

    dependencies = [
        ('zadarma', '0007_pbx_fk3'),
    ]

    operations = [
        migrations.AddField(
            model_name='pbxcall',
            name='ts',
            field=models.DateTimeField(default=datetime.datetime(2000, 1, 1, 0, 0)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='call',
            name='pbx_call',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='calls', to='zadarma.PbxCall'),
        ),
        migrations.RunPython(fill_pbx_ts),
    ]
