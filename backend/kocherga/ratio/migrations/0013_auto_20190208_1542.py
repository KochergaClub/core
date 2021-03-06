# Generated by Django 2.1.5 on 2019-02-08 12:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0012_auto_20190208_1501'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='trainer',
            options={'verbose_name': 'Тренер', 'verbose_name_plural': 'Тренеры'},
        ),
        migrations.AlterField(
            model_name='activity',
            name='trainer',
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name='+',
                to='ratio.Trainer',
                verbose_name='Ведущий',
            ),
        ),
    ]
