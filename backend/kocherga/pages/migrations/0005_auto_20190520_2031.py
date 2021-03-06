# Generated by Django 2.2 on 2019-05-20 17:31

from django.db import migrations
import wagtail.core.blocks
import wagtail.core.fields


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0004_auto_20190504_1720'),
    ]

    operations = [
        migrations.AlterField(
            model_name='freeformpage',
            name='body',
            field=wagtail.core.fields.StreamField(
                [
                    (
                        'basic_lead',
                        wagtail.core.blocks.RichTextBlock(
                            group='basic', label='Крупный текст'
                        ),
                    ),
                    (
                        'basic_paragraph',
                        wagtail.core.blocks.RichTextBlock(
                            group='basic', label='Обычный текст'
                        ),
                    ),
                    (
                        'grey',
                        wagtail.core.blocks.StructBlock(
                            [
                                ('header', wagtail.core.blocks.CharBlock()),
                                (
                                    'text',
                                    wagtail.core.blocks.RichTextBlock(required=False),
                                ),
                            ],
                            group='basic',
                            label='Заголовок секции',
                        ),
                    ),
                    (
                        'columns_basic',
                        wagtail.core.blocks.ListBlock(
                            wagtail.core.blocks.StructBlock(
                                [
                                    ('header', wagtail.core.blocks.CharBlock()),
                                    (
                                        'text',
                                        wagtail.core.blocks.RichTextBlock(
                                            required=False
                                        ),
                                    ),
                                ]
                            ),
                            group='columns',
                            label='Колонки',
                        ),
                    ),
                    (
                        'columns_memberships',
                        wagtail.core.blocks.ListBlock(
                            wagtail.core.blocks.StructBlock(
                                [
                                    (
                                        'title',
                                        wagtail.core.blocks.CharBlock(label='Название'),
                                    ),
                                    (
                                        'subtitle',
                                        wagtail.core.blocks.CharBlock(
                                            label='Подзаголовок'
                                        ),
                                    ),
                                    (
                                        'price',
                                        wagtail.core.blocks.IntegerBlock(
                                            label='Стоимость'
                                        ),
                                    ),
                                    (
                                        'description',
                                        wagtail.core.blocks.RichTextBlock(
                                            label='Описание'
                                        ),
                                    ),
                                ]
                            ),
                            group='columns',
                            label='Абонементы',
                        ),
                    ),
                ]
            ),
        ),
    ]
