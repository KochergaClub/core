# Generated by Django 3.2.4 on 2021-06-06 18:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('kocherga_wagtail', '0001_squash_2021'),
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
        migrations.CreateModel(
            name='TildaPage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('path', models.CharField(editable=False, max_length=255, unique=True)),
                ('body', models.TextField(default='', editable=False)),
                ('title', models.CharField(default='', editable=False, max_length=1024)),
                ('description', models.CharField(default='', editable=False, max_length=1024)),
                ('page_id', models.IntegerField(default=0, editable=False)),
                ('imported_dt', models.DateTimeField(blank=True, null=True)),
                ('show_header_and_footer', models.BooleanField(default=True)),
                ('assets', models.ManyToManyField(to='tilda.Asset')),
                ('og_image', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='+', to='kocherga_wagtail.customimage')),
            ],
        ),
    ]
