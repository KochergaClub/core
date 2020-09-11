from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock

from wagtailgeowidget.blocks import GeoBlock

from kocherga.wagtail.blocks import URLOrAbsolutePathBlock, registry

registry.register_list(
    tag='basic',
    blocks=[
        (
            'grey',  # TODO - rename to `basic_header` or `basic_section_header`
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
            'basic_lead',  # deprecated
            blocks.RichTextBlock(group='basic', label='Крупный текст', icon='bold'),
        ),
        (
            'basic_paragraph',  # deprecated
            blocks.RichTextBlock(group='basic', label='Обычный текст', icon='doc-full'),
        ),
        (
            'basic_text',
            blocks.StructBlock(
                [
                    ('text', blocks.RichTextBlock()),
                    ('centered', blocks.BooleanBlock(required=False)),
                ],
                group='basic',
                label='Обычный текст v2',
                icon='doc-full',
            ),
        ),
        (
            'hr',
            blocks.StaticBlock(
                group='basic', label='Горизонтальная линия', icon='horizontalrule'
            ),
        ),
    ],
)

registry.register_list(
    tag='columns',
    blocks=[
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
            'columns_buttons',
            blocks.ListBlock(
                blocks.StructBlock(
                    [
                        ('title', blocks.CharBlock(label='Заголовок')),
                        ('text', blocks.CharBlock(label='Текст')),
                        ('image', ImageChooserBlock()),
                        ('caption', blocks.CharBlock(label='Текст на кнопке')),
                        ('link', URLOrAbsolutePathBlock(label='Ссылка')),
                    ]
                ),
                group='columns',
                label='Колонки с кнопками',
            ),
        ),
    ],
)


registry.register_list(
    tag='various',
    blocks=[
        (
            'events_list',
            blocks.StaticBlock(group='various', label='Список событий', icon='list-ul'),
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
                        blocks.BooleanBlock(
                            label='Материалы и новости', default=True, required=False
                        ),
                    ),
                    (
                        'events',
                        blocks.BooleanBlock(
                            label='Расписание мероприятий', default=True, required=False
                        ),
                    ),
                    (
                        'trainings',
                        blocks.BooleanBlock(
                            label='Уведомления о новых тренингах',
                            default=True,
                            required=False,
                        ),
                    ),
                ],
                group='various',
                label='Форма подписки',
            ),
        ),
    ],
)

registry.register_list(
    tag='front',
    blocks=[
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
                                    ('title', blocks.CharBlock(label='Текст')),
                                    (
                                        'link',
                                        URLOrAbsolutePathBlock(
                                            label='Ссылка', required=False
                                        ),
                                    ),
                                    (
                                        'highlight',
                                        blocks.BooleanBlock(
                                            label='Важная кнопка',
                                            default=False,
                                            required=False,
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
        ),
        (
            'front_partners',
            blocks.ListBlock(
                blocks.StructBlock(
                    [
                        (
                            'link',
                            URLOrAbsolutePathBlock(label='Ссылка', required=False),
                        ),
                        ('image', ImageChooserBlock()),
                    ]
                ),
                group='various',
                label='Партнёры',
            ),
        ),
        (
            'front_social_links',
            blocks.StaticBlock(group='various', label='Ссылки на соцсети'),
        ),
    ],
)
