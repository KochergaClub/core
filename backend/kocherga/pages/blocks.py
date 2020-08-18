from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock

from wagtailgeowidget.blocks import GeoBlock

from kocherga.wagtail.blocks import URLOrAbsolutePathBlock

basic_blocks = [
    (
        'grey',
        blocks.StructBlock(
            [
                ('header', blocks.CharBlock()),
                ('text', blocks.RichTextBlock(required=False)),
            ],
            group='basic',
            label='Заголовок секции',
            icon='title',
        ),
    ),
    (
        'basic_lead',
        blocks.RichTextBlock(group='basic', label='Крупный текст', icon='bold'),
    ),
    (
        'basic_paragraph',
        blocks.RichTextBlock(group='basic', label='Обычный текст', icon='doc-full'),
    ),
]

columns_blocks = [
    (
        'columns_basic',
        blocks.ListBlock(
            blocks.StructBlock(
                [
                    ('header', blocks.CharBlock()),
                    ('text', blocks.RichTextBlock(required=False)),
                ],
            ),
            group='columns',
            label='Колонки',
        ),
    ),
    (
        'columns_memberships',
        blocks.ListBlock(
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
        ),
    ),
    (
        'columns_buttons',
        blocks.ListBlock(
            blocks.StructBlock(
                [
                    ('title', blocks.CharBlock(label='Текст')),
                    ('caption', blocks.CharBlock(label='Текст на кнопке')),
                    ('link', URLOrAbsolutePathBlock(label='Ссылка')),
                ]
            ),
            group='columns',
            label='Колонки с кнопками',
        ),
    ),
]


various_blocks = [
    (
        'events_list',
        blocks.StaticBlock(group='various', label='Список событий', icon='list-ul',),
    ),
    (
        'big_contacts',
        blocks.StructBlock(
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
        ),
    ),
    (
        'photo_ribbon',
        blocks.ListBlock(ImageChooserBlock(), group='various', label='Лента фоток'),
    ),
    (
        'mailchimp_subscribe',
        blocks.StructBlock(
            [
                (
                    'news',
                    blocks.BooleanBlock(label='Материалы и новости', default=True),
                ),
                (
                    'events',
                    blocks.BooleanBlock(label='Расписание мероприятий', default=True),
                ),
                (
                    'trainings',
                    blocks.BooleanBlock(
                        label='Уведомления о новых тренингах', default=True
                    ),
                ),
            ],
            group='various',
            label='Форма подписки',
        ),
    ),
]

all_blocks = basic_blocks + columns_blocks + various_blocks


hero_blocks = [
    (
        'hero_front',
        blocks.StructBlock(
            [
                ('title', blocks.CharBlock(label='Заголовок')),
                (
                    'buttons',
                    blocks.ListBlock(
                        blocks.StructBlock(
                            [
                                ('title', blocks.CharBlock(label='Подзаголовок')),
                                (
                                    'link',
                                    URLOrAbsolutePathBlock(
                                        label='Ссылка', required=False
                                    ),
                                ),
                            ]
                        ),
                        label='Кнопки',
                    ),
                ),
            ],
            icon='home',
            group='various',
        ),
    )
]
