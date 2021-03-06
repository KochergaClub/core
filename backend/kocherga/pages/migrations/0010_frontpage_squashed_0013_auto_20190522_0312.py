# Generated by Django 2.2 on 2019-05-22 00:32

from django.db import migrations, models
import django.db.models.deletion
import kocherga.wagtail.mixins
import wagtail.core.blocks
import wagtail.core.blocks.static_block
import wagtail.core.fields
import wagtailgeowidget.blocks


class Migration(migrations.Migration):

    replaces = [
        ('pages', '0010_frontpage'),
        ('pages', '0011_auto_20190521_2230'),
        ('pages', '0012_auto_20190521_2242'),
        ('pages', '0013_auto_20190522_0312'),
    ]

    dependencies = [
        ('wagtailcore', '0041_group_collection_permissions_verbose_name_plural'),
        ('pages', '0009_auto_20190521_1758'),
    ]

    operations = [
        migrations.CreateModel(
            name='FrontPage',
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
                (
                    'body',
                    wagtail.core.fields.StreamField(
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
                                            wagtail.core.blocks.RichTextBlock(
                                                required=False
                                            ),
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
                                                wagtail.core.blocks.CharBlock(
                                                    label='Название'
                                                ),
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
                            (
                                'columns_buttons',
                                wagtail.core.blocks.ListBlock(
                                    wagtail.core.blocks.StructBlock(
                                        [
                                            (
                                                'title',
                                                wagtail.core.blocks.CharBlock(
                                                    label='Текст'
                                                ),
                                            ),
                                            (
                                                'caption',
                                                wagtail.core.blocks.CharBlock(
                                                    label='Текст на кнопке'
                                                ),
                                            ),
                                            (
                                                'link',
                                                wagtail.core.blocks.URLBlock(
                                                    label='Ссылка'
                                                ),
                                            ),
                                        ]
                                    ),
                                    group='columns',
                                    label='Колонки с кнопками',
                                ),
                            ),
                            (
                                'events_list',
                                wagtail.core.blocks.static_block.StaticBlock(
                                    group='events', label='Список событий'
                                ),
                            ),
                            ('map', wagtailgeowidget.blocks.GeoBlock()),
                            (
                                'big_contacts',
                                wagtail.core.blocks.StructBlock(
                                    [
                                        ('map', wagtailgeowidget.blocks.GeoBlock()),
                                        (
                                            'address',
                                            wagtail.core.blocks.CharBlock(
                                                label='Адрес'
                                            ),
                                        ),
                                        (
                                            'phone',
                                            wagtail.core.blocks.CharBlock(
                                                label='Телефон'
                                            ),
                                        ),
                                        (
                                            'email',
                                            wagtail.core.blocks.CharBlock(
                                                label='Email'
                                            ),
                                        ),
                                        (
                                            'text',
                                            wagtail.core.blocks.CharBlock(
                                                label='Текст'
                                            ),
                                        ),
                                    ],
                                    group='various',
                                    label='Карта с адресом',
                                ),
                            ),
                            (
                                'hero_front',
                                wagtail.core.blocks.StructBlock(
                                    [
                                        (
                                            'title',
                                            wagtail.core.blocks.CharBlock(
                                                label='Заголовок'
                                            ),
                                        ),
                                        (
                                            'features',
                                            wagtail.core.blocks.ListBlock(
                                                wagtail.core.blocks.StructBlock(
                                                    [
                                                        (
                                                            'title',
                                                            wagtail.core.blocks.CharBlock(
                                                                label='Подзаголовок'
                                                            ),
                                                        ),
                                                        (
                                                            'link',
                                                            wagtail.core.blocks.URLBlock(
                                                                label='Ссылка',
                                                                required=False,
                                                            ),
                                                        ),
                                                        (
                                                            'items',
                                                            wagtail.core.blocks.ListBlock(
                                                                wagtail.core.blocks.StructBlock(
                                                                    [
                                                                        (
                                                                            'text',
                                                                            wagtail.core.blocks.CharBlock(
                                                                                label='Элемент'
                                                                            ),
                                                                        ),
                                                                        (
                                                                            'link',
                                                                            wagtail.core.blocks.URLBlock(
                                                                                label='Ссылка',
                                                                                required=False,
                                                                            ),
                                                                        ),
                                                                    ]
                                                                )
                                                            ),
                                                        ),
                                                    ]
                                                ),
                                                label='Фичи',
                                            ),
                                        ),
                                    ]
                                ),
                            ),
                        ]
                    ),
                ),
            ],
            options={'abstract': False,},
            bases=(kocherga.wagtail.mixins.HeadlessPreviewMixin, 'wagtailcore.page'),
        ),
    ]
