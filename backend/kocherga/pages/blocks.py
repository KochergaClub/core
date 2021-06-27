from django.core import validators
from kocherga.wagtail.blocks import SafeRichTextBlock, URLOrAbsolutePathBlock, registry
from wagtail.core import blocks
from wagtail.images.blocks import ImageChooserBlock
from wagtailgeowidget.blocks import GeoBlock

registry.register_list(
    tag='any',
    blocks=[
        (
            'basic_text',
            blocks.StructBlock(
                [
                    ('text', SafeRichTextBlock()),
                    ('centered', blocks.BooleanBlock(required=False)),
                ],
                group='basic',
                label='Обычный текст',
                icon='doc-full',
            ),
        ),
        (
            'basic_card',
            SafeRichTextBlock(group='basic', label='Карточка с информацией'),
        ),
        (
            'section_header',
            blocks.StructBlock(
                [
                    ('header', blocks.CharBlock()),
                    ('text', SafeRichTextBlock(required=False)),
                ],
                group='basic',
                label='Заголовок секции',
                icon='title',
            ),
        ),
        (
            'hr',
            blocks.StaticBlock(
                group='basic', label='Горизонтальная линия', icon='horizontalrule'
            ),
        ),
        (
            'anchor',
            blocks.CharBlock(
                validators=[validators.validate_slug],
                label='Якорь',
                icon='tag',
            ),
        ),
    ],
)

registry.register_list(
    tag='any',
    blocks=[
        (
            'columns_basic',
            blocks.ListBlock(
                blocks.StructBlock(
                    [
                        ('header', blocks.CharBlock()),
                        ('text', SafeRichTextBlock(required=False)),
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
    tag='any',
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
    tag='any',
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
                group='landing',
            ),
        ),
        (
            'landing_hero',
            blocks.StructBlock(
                [
                    ('image', ImageChooserBlock()),
                    ('title', blocks.CharBlock(label='Заголовок')),
                    ('text', blocks.CharBlock(label='Текст')),
                ],
                group='landing',
            ),
        ),
        (
            'landing_text',
            blocks.StructBlock(
                [
                    ('text', SafeRichTextBlock()),
                    ('centered', blocks.BooleanBlock(required=False)),
                    ('large', blocks.BooleanBlock(required=False)),
                    ('gray', blocks.BooleanBlock(required=False)),
                ],
                group='landing',
                label='Текст',
                icon='doc-full',
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
                group='landing',
                label='Партнёры',
            ),
        ),
        (
            'front_social_links',
            blocks.StaticBlock(group='landing', label='Ссылки на соцсети'),
        ),
    ],
)
