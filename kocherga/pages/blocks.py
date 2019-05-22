from rest_framework import serializers

from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock
import wagtail.images

from wagtailgeowidget.blocks import GeoBlock

from kocherga.wagtail.blocks import URLOrAbsolutePathBlock

basic_blocks = [
    ('grey', blocks.StructBlock(
        [
            ('header', blocks.CharBlock()),
            ('text', blocks.RichTextBlock(required=False)),
        ],
        group='basic',
        label='Заголовок секции',
        icon='title',
    )),
    ('basic_lead', blocks.RichTextBlock(
        group='basic',
        label='Крупный текст',
        icon='bold',
    )),
    ('basic_paragraph', blocks.RichTextBlock(
        group='basic',
        label='Обычный текст',
        icon='doc-full',
    )),
]

columns_blocks = [
    ('columns_basic', blocks.ListBlock(
        blocks.StructBlock(
            [
                ('header', blocks.CharBlock()),
                ('text', blocks.RichTextBlock(required=False)),
            ],
        ),
        group='columns',
        label='Колонки',
    )),
    ('columns_memberships', blocks.ListBlock(
        blocks.StructBlock(
            [
                ('title', blocks.CharBlock(label='Название')),
                ('subtitle', blocks.CharBlock(label='Подзаголовок')),
                ('price', blocks.IntegerBlock(label='Стоимость')),
                ('description', blocks.RichTextBlock(label='Описание')),
            ],
        ),
        group='columns',
        label='Абонементы',
    )),
    ('columns_buttons', blocks.ListBlock(
        blocks.StructBlock(
            [
                ('title', blocks.CharBlock(label='Текст')),
                ('caption', blocks.CharBlock(label='Текст на кнопке')),
                ('link', URLOrAbsolutePathBlock(label='Ссылка')),
            ]
        ),
        group='columns',
        label='Колонки с кнопками',
    )),
]


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = wagtail.images.models.Image
        fields = ['file160', 'file320', 'file']

    file160 = serializers.SerializerMethodField()
    file320 = serializers.SerializerMethodField()

    def get_file160(self, obj):
        return obj.get_rendition('min-200x160').url

    def get_file320(self, obj):
        return obj.get_rendition('min-400x320').url


class APIImageChooserBlock(ImageChooserBlock):
    def get_api_representation(self, value, context=None):
        return ImageSerializer(context=context).to_representation(value)


various_blocks = [
    ('events_list', blocks.StaticBlock(
        group='various',
        label='Список событий',
        icon='list-ul',
    )),
    ('big_contacts', blocks.StructBlock(
        [
            ('map', GeoBlock(label='Координаты')),
            ('address', blocks.CharBlock(label='Адрес')),
            ('phone', blocks.CharBlock(label='Телефон')),
            ('email', blocks.CharBlock(label='Email')),
            ('text', blocks.CharBlock(label='Текст')),
        ],
        group='various',
        label='Карта с адресом',
        icon='site',
    )),
    ('photo_ribbon', blocks.ListBlock(
        APIImageChooserBlock(),
        group='various',
        label='Лента фоток',
    )),
]

all_blocks = basic_blocks + columns_blocks + various_blocks


hero_block = (
    'hero_front',
    blocks.StructBlock([
        ('title', blocks.CharBlock(label='Заголовок')),
        ('features', blocks.ListBlock(
            blocks.StructBlock(
                [
                    ('title', blocks.CharBlock(label='Подзаголовок')),
                    ('link', URLOrAbsolutePathBlock(label='Ссылка', required=False)),
                    ('items', blocks.ListBlock(
                        blocks.StructBlock(
                            [
                                ('text', blocks.CharBlock(label='Элемент')),
                                ('link', URLOrAbsolutePathBlock(label='Ссылка', required=False)),
                            ]
                        )
                    )),
                ]
            ),
            label='Фичи',
        ))
    ], icon='home', group='various'))
