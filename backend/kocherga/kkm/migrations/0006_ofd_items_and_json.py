# Generated by Django 3.1.3 on 2020-11-09 18:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('kkm', '0005_fiscal_drive_model'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ofddocument',
            options={'ordering': ['-timestamp']},
        ),
        migrations.AddField(
            model_name='ofddocument',
            name='imported_json',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.CreateModel(
            name='OfdDocumentItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('quantity', models.FloatField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('sum', models.DecimalField(decimal_places=2, max_digits=10)),
                ('product_type', models.IntegerField()),
                ('payment_type', models.IntegerField()),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='kkm.ofddocument')),
            ],
        ),
    ]