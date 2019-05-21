# Generated by Django 2.2 on 2019-05-19 14:04

from django.db import migrations, models
import django.db.models.deletion
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0041_group_collection_permissions_verbose_name_plural'),
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogIndexPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='wagtailcore.Page')),
            ],
            options={
                'abstract': False,
            },
            bases=('wagtailcore.page',),
        ),
        migrations.AlterField(
            model_name='blogpostauthor',
            name='description',
            field=models.TextField(blank=True, verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='blogpostauthor',
            name='name',
            field=models.CharField(max_length=80, verbose_name='Имя'),
        ),
        migrations.AlterField(
            model_name='blogpostpage',
            name='body',
            field=wagtail.core.fields.RichTextField(verbose_name='Текст'),
        ),
        migrations.AlterField(
            model_name='blogpostpage',
            name='date',
            field=models.DateField(verbose_name='Дата поста'),
        ),
    ]