from wagtail.core import blocks

section_blocks = [
    ('ratio_briefing', blocks.RichTextBlock()),
    ('ratio_header', blocks.CharBlock(classname="full title")),
    ('ratio_paragraph', blocks.RichTextBlock()),
    ('ratio_inset', blocks.RichTextBlock()),
    ('ratio_exercise', blocks.StructBlock([
        ('header', blocks.CharBlock()),
        ('lines_count', blocks.IntegerBlock()),
    ])),
]
