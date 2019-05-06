from wagtail.core import blocks
from wagtailmath.blocks import MathBlock

section_blocks = [
    ('ratio_header', blocks.CharBlock(
        classname="full title",
        group='Текст',
        label='Заголовок',
        icon='title',
    )),
    ('ratio_paragraph', blocks.RichTextBlock(
        group='Текст',
        label='Текст',
    )),
    ('ratio_inset', blocks.RichTextBlock(
        group='Текст',
        label='Врезка',
        icon='placeholder',
    )),
    ('ratio_exercise', blocks.StructBlock(
        [
            ('header', blocks.CharBlock(
                label='Задание',
            )),
            ('lines_count', blocks.IntegerBlock(
                label='Число строк',
            )),
            ('enumerate', blocks.BooleanBlock(
                required=False,
                default=True,
                label='Нумеровать строки',
            )),
        ],
        icon='list-ol',
        label='Задание со строками',
        group='Упражнение',
    )),
    ('ratio_exercise_oneline', blocks.StructBlock(
        [
            ('text', blocks.CharBlock(label='Задание')),
        ],
        icon='horizontalrule',
        label='Задание с одним полем',
        group='Упражнение',
    )),
    ('ratio_briefing', blocks.RichTextBlock(
        label='Вводная часть',
        icon='home',
    )),
    ('ratio_math', MathBlock(
        label='Формула',
    )),
]

notebook_blocks = [
    ('ratio_notebook_section', blocks.PageChooserBlock(page_type='ratio.SectionPage')),
]
