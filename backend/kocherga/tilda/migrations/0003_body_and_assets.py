# Generated by Django 3.0.5 on 2020-06-11 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tilda', '0002_rename_alias_to_path'),
    ]

    operations = [
        migrations.CreateModel(
            name='Asset',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField(max_length=255)),
                ('kind', models.CharField(choices=[('css', 'css'), ('js', 'js'), ('image', 'image')], max_length=10)),
            ],
        ),
        migrations.AddField(
            model_name='tildapage',
            name='body',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='tildapage',
            name='assets',
            field=models.ManyToManyField(to='tilda.Asset'),
        ),
    ]
