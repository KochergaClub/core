# Generated by Django 3.1.3 on 2021-03-08 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratio', '0071_testimonial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testimonial',
            name='author_description',
            field=models.CharField(blank=True, max_length=1024),
        ),
    ]
