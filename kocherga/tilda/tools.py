import json

from . import api


def export_all(directory='/data/tilda'):
    pages = api.get_pages_list()
    config = []

    for page in pages:
        page_id = page['id']
        page_full = api.get_page_full(page_id)

        html = page_full['html']
        alias = page_full['alias']
        filename = page_full['filename']
        with open(directory + '/' + filename, 'w') as fh:
            fh.write(html)

        config.append({
            'alias': alias,
            'filename': filename,
        })
        break

    with open(directory + '/' + 'config.json', 'w') as fh:
        fh.write(json.dumps(config))
