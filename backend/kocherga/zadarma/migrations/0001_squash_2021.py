# Generated by Django 3.2.4 on 2021-06-06 18:17

from django.db import migrations, models
import django.db.models.deletion
import kocherga.zadarma.models.call


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('staff', '0001_squash_2021'),
    ]

    operations = [
        migrations.CreateModel(
            name='PbxCall',
            fields=[
                ('pbx_call_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('ts', models.DateTimeField()),
            ],
            options={
                'verbose_name': 'АТС-звонок',
                'verbose_name_plural': 'АТС-звонки',
                'ordering': ['-ts'],
            },
        ),
        migrations.CreateModel(
            name='PbxCallData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pbx_call', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='data', to='zadarma.pbxcall')),
                ('staff_member', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='staff.member')),
            ],
        ),
        migrations.CreateModel(
            name='Call',
            fields=[
                ('call_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('ts', models.DateTimeField()),
                ('call_type', models.CharField(max_length=15)),
                ('disposition', models.CharField(max_length=40)),
                ('clid', models.CharField(blank=True, max_length=100)),
                ('destination', models.CharField(max_length=20)),
                ('sip', models.CharField(max_length=100)),
                ('seconds', models.IntegerField()),
                ('is_recorded', models.IntegerField()),
                ('watchman', models.CharField(max_length=100)),
                ('record', models.FileField(blank=True, upload_to=kocherga.zadarma.models.call.call_path)),
                ('pbx_call', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='calls', to='zadarma.pbxcall')),
            ],
            options={
                'verbose_name': 'Звонок',
                'verbose_name_plural': 'Звонки',
                'db_table': 'zadarma_calls',
                'ordering': ['-ts'],
                'permissions': (('listen', 'Может слушать звонки'), ('admin', 'Может администрировать звонки')),
            },
        ),
    ]
