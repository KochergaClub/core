# Generated by Django 3.0.10 on 2020-10-22 00:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0052_ticket_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='tickettype',
            name='name',
            field=models.CharField(
                default='unknown', max_length=255, verbose_name='Название'
            ),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='order',
            name='payer_email',
            field=models.EmailField(blank=True, default='', max_length=254),
        ),
        migrations.AlterField(
            model_name='order',
            name='payer_first_name',
            field=models.EmailField(blank=True, default='', max_length=254),
        ),
        migrations.AlterField(
            model_name='order',
            name='payer_last_name',
            field=models.EmailField(blank=True, default='', max_length=254),
        ),
        migrations.AlterField(
            model_name='tickettype',
            name='training',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name='ticket_types',
                to='ratio.Training',
            ),
        ),
    ]