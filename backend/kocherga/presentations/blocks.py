from wagtail.core import blocks

title_block = blocks.CharBlock(label='Заголовок')
rich_text_block = blocks.RichTextBlock(label='Текст с разметкой')

# FIXME - warning! this block shouldn't be available to anyone but trusted staff.
raw_html_block = blocks.RawHTMLBlock(label='Произвольный HTML')

slide_blocks = [
    ('slide_title', title_block),
    ('slide_rich_text', rich_text_block),
    ('slide_raw_html', raw_html_block),
    # ('slide_fragments', blocks.StreamBlock([
    #     ('title', title_block),
    #     ('rich_text', rich_text_block),
    # ]))
]
