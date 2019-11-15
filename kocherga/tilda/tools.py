import logging
logger = logging.getLogger(__name__)

import json

from . import api

EXPORT_DIR = '/data/tilda'


def config_filename():
    return EXPORT_DIR + '/' + 'config.json'


def save_config(config):
    logger.info('Saving new Tilda config')
    with open(config_filename(), 'w') as fh:
        fh.write(json.dumps(config))


def _get_and_save(page_id):
    page_full = api.get_page_full(page_id)
    if not page_full['published']:
        return  # not published, should be timestamp

    html = page_full['html']
    alias = page_full['alias']
    filename = page_full['filename']

    if alias == 'blog' or alias.startswith('blog/'):
        logger.info('/blog got moved to Wagtail')
        return

    if alias == '' and str(page_id) != '44270':
        logger.info('Empty alias but probably not frontpage')
        return

    with open(EXPORT_DIR + '/' + filename, 'w') as fh:
        fh.write(html)

    return {
        'alias': alias,
        'filename': filename,
    }


def export_all():
    logger.info('Exporting all Tilda pages')
    pages = api.get_pages_list()
    config = []

    for page in pages:
        page_id = page['id']
        config_item = _get_and_save(page_id)
        if not config_item:
            continue
        config.append(config_item)

    save_config(config)


def export_page(page_id):
    logger.info(f'Exporting Tilda page {page_id}')

    updated_config_item = _get_and_save(page_id)
    if not updated_config_item:
        return

    with open(config_filename()) as fh:
        config = json.loads(fh.read())

    new_config = []
    found = False
    for config_item in config:
        if config_item['alias'] == updated_config_item['alias']:
            config_item = updated_config_item
            found = True
        new_config.append(config_item)

    if not found:
        new_config.append(updated_config_item)

    save_config(new_config)
