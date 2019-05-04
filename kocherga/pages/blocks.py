from wagtail.core import blocks

all_blocks = [
    ('basic_header', blocks.CharBlock(group='basic')),
    ('basic_paragraph', blocks.RichTextBlock(group='basic')),
    ('grey', blocks.StructBlock([
        ('header', blocks.CharBlock()),
        ('text', blocks.RichTextBlock(required=False)),
    ], group='style')),
    ('columns_basic', blocks.ListBlock(
        blocks.StructBlock([
            ('header', blocks.CharBlock()),
            ('text', blocks.RichTextBlock(required=False)),
        ]), group='columns')),
]
