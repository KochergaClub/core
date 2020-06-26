# Generated by Django 2.2.5 on 2019-12-03 23:09

from django.db import migrations, models
import django.db.models.deletion
import kocherga.wagtail.mixins
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('wagtailcore', '0041_group_collection_permissions_verbose_name_plural'),
        ('faq', '0002_sortable_entries'),
    ]

    operations = [
        migrations.CreateModel(
            name='FAQPage',
            fields=[
                (
                    'page_ptr',
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to='wagtailcore.Page',
                    ),
                ),
            ],
            options={'abstract': False,},
            bases=(kocherga.wagtail.mixins.HeadlessPreviewMixin, 'wagtailcore.page'),
        ),
        migrations.AddField(
            model_name='entry',
            name='page',
            field=modelcluster.fields.ParentalKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='entries',
                to='faq.FAQPage',
            ),
        ),
    ]
