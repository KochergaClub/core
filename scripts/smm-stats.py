#!/usr/bin/env python
import pathlib, sys
sys.path.append(str(pathlib.Path(__file__).parent.parent))

import logging
logger = logging.getLogger(__name__)

import re
from collections import OrderedDict
import statistics
import math
import time
import gspread

import kocherga.google
import kocherga.vk.api
import kocherga.vk.helpers

SMM_SPREADSHEET_KEY = '1CrUc7axlvKg67_lIG_dth5EvYeZp_WDjir4fDfAYe6o'

def parse_old_sheet_html():
    filename = '/Users/berekuk/Downloads/Информационные партнеры/ВК.html'
    html = open(filename).read()
    rows = re.findall(r'<tr.*?</tr>', html)

    result = []
    for row in rows:
        if '<th class="row-header' in row:
            continue
        if 'class="freezebar-cell' in row:
            continue

        match = re.match(r'<tr.*?><th.*?>.*?</th><td.*?>(.*?)</td><td.*?>(.*?)</td>', row)
        if not match:
            raise Exception(row)
        (title, maybe_link) = match.groups()
        expanded = True

        if title == 'что' and maybe_link == 'ссылка':
            continue

        if maybe_link:
            maybe_link = re.match(r'<a target="_blank" href="(.*?)">(.*)</a>', maybe_link).group(1)
        else:
            expanded = False

        if title.startswith('<a'):
            title_match = re.match(r'<a target="_blank" href="(.*?)">(.*)</a>', title)
            (link, title) = title_match.groups()
            if maybe_link and link not in maybe_link:
                raise Exception(f"Got link {link} from A cell, but B cell contains {maybe_link} too")
            maybe_link = link
        result.append({
            'title': title,
            'link': maybe_link,
            'row_id': len(result) + 2,
            'expanded': expanded,
        })

    # look for duplicates
    title2link = {}
    for item in result:
        if item['title'] in title2link:
            logger.info('DUPLICATE: ' + title2link[item['title']] + ' vs ' + item['link'])
        else:
            title2link[item['title']] = item['link']

    return result


def get_scitopus_list():
    response = kocherga.vk.api.call('pages.get', {
        'owner_id': -112289703,
        'page_id': 52694501,
        'need_html': True, # we don't have enough permissions ask for source, unfortunately
    })
    html = response['html']

    result = []
    for group in re.findall(r'<a class="wk_vk_link" href="([^"]+)">(.*?)</a>', html):
        result.append(group)

    link2title = OrderedDict()
    for (link, title) in result:
        if link[0] == '/':
            link = 'https://vk.com' + link

        if link in link2title:
            known_title = link2title[link]
            if title == known_title:
                continue # full duplicate
            raise Exception(f"Duplicate for {link}: {known_title} and {title}")
        else:
            link2title[link] = title

    return link2title

def get_sheet():
    gc = kocherga.google.gspread_client()
    spreadsheet = gc.open_by_key(SMM_SPREADSHEET_KEY)

    worksheet = spreadsheet.worksheet("ВК")
    return worksheet

def fix_sheet():
    sheet = get_sheet()
    for row in parse_old_sheet_html():
        if row['expanded']:
            continue
        if sheet.cell(row['row_id'], 2).value:
            continue
        logger.info(sheet.cell(row['row_id'], 1).value, ' <------> ', row['title'])
        assert sheet.cell(row['row_id'], 1).value == row['title']
        sheet.update_cell(row['row_id'], 1, row['title'])
        sheet.update_cell(row['row_id'], 2, row['link'])

def update_with_retry(sheet, row, column, value):
    for i in range(10):
        try:
            sheet.update_cell(row, column, value)
            return
        except gspread.exceptions.APIError:
            logger.info(f"APIError, sleep for {2**i} seconds")
            time.sleep(2 ** i)

def main():
    sheet = get_sheet()

    def round2(x):
        if x == 0:
            return 0
        return round(x, 1-int(math.floor(math.log10(abs(x)))))

    for (i, link) in enumerate(sheet.col_values(2)):
        if i == 0:
            continue
        row = i + 1
        link = link.strip()

        match = re.match(r'^https://vk.com/(.*)', link)
        if not match:
            continue
        group_name = match.group(1)
        logger.info(f'Group: {group_name}')
        group_id = kocherga.vk.helpers.group2id(group_name)

        response = kocherga.vk.api.call('wall.get', {
            'owner_id': -group_id,
            'count': 100,
        })
        posts = [p for p in response['items'] if p.get('is_pinned', 0) == 0 and 'views' in p]
        views = [p['views']['count'] for p in posts]

        if views:
            median_views = statistics.median(views)
            views_variance = math.sqrt(statistics.variance(views))
        else:
            median_views = 0
            views_variance = 0

        update_with_retry(sheet, row, 4, round2(median_views))
        update_with_retry(sheet, row, 5, round2(views_variance))

if __name__ == '__main__':
    main()
