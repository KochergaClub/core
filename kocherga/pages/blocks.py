from wagtail.core import blocks

all_blocks = [
    ('basic_lead', blocks.RichTextBlock(
        group='basic',
        label='Крупный текст',
    )),
    ('basic_paragraph', blocks.RichTextBlock(
        group='basic',
        label='Обычный текст',
    )),
    ('grey', blocks.StructBlock(
        [
            ('header', blocks.CharBlock()),
            ('text', blocks.RichTextBlock(required=False)),
        ],
        group='basic',
        label='Заголовок секции',
    )),
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
                ('link', blocks.URLBlock(label='Ссылка')),
            ]
        ),
        group='columns',
        label='Колонки с кнопками',
    )),
    ('events_list', blocks.StaticBlock(group='events', label='Список событий')),
]
