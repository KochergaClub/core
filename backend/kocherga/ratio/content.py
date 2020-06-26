import re
import subprocess
import json
from pathlib import Path
import os


class Section:
    def __init__(self, name):
        self.name = name

    @property
    def source_filename(self):
        return f'/Users/berekuk/Google Drive/Rationality/Workshops/Секции/{self.name}/handbook.md'

    def get_source(self):
        return open(self.source_filename).read()

    def remark_tree(self):
        cwd = Path(__file__).parent.parent.parent
        os.chdir(cwd)
        out = subprocess.check_output(
            ['node', 'scripts/parse-handbook-markdown.js'],
            stdin=open(self.source_filename),
        )
        tree = json.loads(out)

        return tree

    def _populate_docx_list(self, document, tree):
        for node in tree['children']:
            paragraph = document.add_paragraph('')
            if node['type'] != 'listItem':
                print(f"Unexpected list item type {node['type']}")
            paragraph.style = 'Неупорядоченный список'

            if len(node['children']) != 1:
                raise Exception(
                    "Expected 1 child, got: " + json.dumps(node, ensure_ascii=False)
                )
            if node['children'][0]['type'] != 'paragraph':
                raise Exception(
                    "Expected paragraph child, got: "
                    + json.dumps(node, ensure_ascii=False)
                )

            self._populate_docx_paragraph(paragraph, node['children'][0])

    def _populate_docx_paragraph(self, paragraph, tree):
        def expect_one_text_child(node):
            if len(node['children']) != 1:
                raise Exception(
                    "Expected 1 child, got: " + json.dumps(node, ensure_ascii=False)
                )
            if node['children'][0]['type'] != 'text':
                raise Exception(
                    "Expected text child, got: " + json.dumps(node, ensure_ascii=False)
                )

        for node in tree['children']:
            # print(node)
            if node['type'] == 'text':
                text = node['value']
                text = text.replace('\n', '')
                paragraph.add_run(text)

            elif node['type'] == 'strong':
                expect_one_text_child(node)
                paragraph.add_run(node['children'][0]['value']).bold = True

            elif node['type'] == 'emphasis':
                expect_one_text_child(node)
                paragraph.add_run(node['children'][0]['value']).italic = True

            else:
                print(f"Unknown text type {node['type']}")
                continue

    def _populate_docx_styled_block(self, document, tree):
        assert len(tree['children']) == 1
        body = tree['children'][0]

        match = re.match(r'(\S+)CustomBlockBody', body['type'])
        if not match:
            print(f"Can't parse styled block {body['type']}")
        block_type = match.group(1)

        type2style = {
            'description': 'Вводный текст',
            'exercise': 'Заголовок упражнения',
            'box': 'Врезка',
        }

        self._populate_docx_any(document, body, default_style=type2style[block_type])

    def _populate_docx_placeholder(self, document, count):
        # FIXME - restart numbering
        for i in range(count):
            paragraph = document.add_paragraph('')
            paragraph.style = 'Линейки для заполнения'
            paragraph.add_run('\t' * 11)

    def _populate_docx_any(self, document, tree, default_style='Текст'):
        for child in tree['children']:

            if child['type'] == 'paragraph':
                paragraph = document.add_paragraph('')
                paragraph.style = default_style
                self._populate_docx_paragraph(paragraph, child)

            elif child['type'] == 'heading':
                paragraph = document.add_paragraph('')
                paragraph.style = f"Heading {child['depth'] + 1}"
                self._populate_docx_paragraph(paragraph, child)

            elif child['type'] == 'list':
                self._populate_docx_list(document, child)

            elif child['type'].endswith('CustomBlock'):
                self._populate_docx_styled_block(document, child)

            elif child['type'] == 'shortcode':
                assert child['identifier'] == 'placeholder'
                count = int(child['attributes']['count'])
                self._populate_docx_placeholder(document, count)

            else:
                print(f"Unknown paragraph type {child['type']}")

    def populate_docx(self, document):
        tree = self.remark_tree()
        self._populate_docx_any(document, tree)
