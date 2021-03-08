# Generated by Django 3.1.3 on 2021-03-08 16:05

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('kocherga_wagtail', '0006_kochergapage'),
        ('ratio', '0070_training_training_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='Testimonial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('author_name', models.CharField(max_length=80)),
                ('author_description', models.CharField(blank=True, max_length=80)),
                ('text', wagtail.core.fields.RichTextField()),
                ('author_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='kocherga_wagtail.customimage')),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
    ]
