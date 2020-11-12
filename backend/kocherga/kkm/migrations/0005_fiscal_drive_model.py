# Generated by Django 3.0.10 on 2020-11-08 18:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('kkm', '0004_kkt_fk'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='OfdKkt',
            new_name='OfdFiscalDrive',
        ),
        migrations.AlterModelOptions(
            name='permissions',
            options={'default_permissions': (), 'managed': False, 'permissions': [('kkmserver', 'Can access kkmserver'), ('ofd', 'Can access imported OFD data')]},
        ),
        migrations.RenameField(
            model_name='ofddocument',
            old_name='kkt',
            new_name='fiscal_drive',
        ),
    ]