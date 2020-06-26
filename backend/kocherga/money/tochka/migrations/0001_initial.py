# Generated by Django 2.1.5 on 2019-01-14 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Record',
            fields=[
                (
                    'id',
                    models.CharField(max_length=100, primary_key=True, serialize=False),
                ),
                ('ts', models.IntegerField()),
                ('purpose', models.TextField()),
                ('document_type', models.IntegerField()),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={'db_table': 'tochka_records',},
        ),
    ]
