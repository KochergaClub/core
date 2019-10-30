import json

from . import api


def export_all(directory):
    pages = api.get_pages_list()
    alias2filename = {}

    for page in pages:
        page_id = page['id']
        page_full = api.get_page_full(page_id)

        html = page_full['html']
        alias = page_full['alias']
        filename = page_full['filename']
        with open(directory + '/' + filename, 'w') as fh:
            fh.write(html)

        alias2filename[alias] = filename
        break

    with open(directory + '/' + 'alias2filename.json', 'w') as fh:
        fh.write(json.dumps(alias2filename))
