from wagtail.core import blocks

slide_features = [
    'bold',
    'italic',
    'bad',  # our custom feature
    'embed',
    'link',
    'h2',
    'h3',
    'h4',
    'hr',
    'ol',
    'ul',
    'image',
]

title_block = blocks.CharBlock(label='Заголовок', classname='title')
rich_text_block = blocks.RichTextBlock(
    label='Текст с разметкой', features=slide_features
)

# FIXME - warning! this block shouldn't be available to anyone but trusted staff.
raw_html_block = blocks.RawHTMLBlock(label='Произвольный HTML')

slide_blocks = [
    ('slide_title', title_block),
    ('slide_rich_text', rich_text_block),
    ('slide_raw_html', raw_html_block),
    (
        'slide_fragments',
        blocks.StreamBlock(
            [
                (
                    'rich_text',
                    blocks.RichTextBlock(label='Текст', features=slide_features),
                ),
                ('raw_html', blocks.RawHTMLBlock(label='Произвольный HTML')),
            ],
            label='Фрагменты (появляются поочерёдно)',
        ),
    ),
]
