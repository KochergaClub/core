#!/usr/bin/env python3

import logging
logger = logging.getLogger(__name__)

import MySQLdb

OLD_DB = 'kocherga'
NEW_DB = 'kocherga_django'

def get_db():
    return MySQLdb.connect(
        host="localhost",
        user="root",
        passwd="",
        db=OLD_DB,
    )

def list_tables(db, boosted=[]):
    cur = db.cursor()
    cur.execute('SHOW TABLES')
    tables = [t[0] for t in cur.fetchall()]

    # reorder to avoid foreign keys issues
    for boosted_table in boosted:
        if boosted_table not in tables:
            raise Exception("Wanted to boost {boosted_table} but it's not there")
    tables = boosted + [t for t in tables if t not in boosted]

    return tables

def denull_query(field):
    return f"IFNULL({field}, '')"

def denull_zero_query(field):
    return f"IFNULL({field}, 0)"

class Table():
    def __init__(self, name, config):
        self.name = name
        self.denull = config.get('denull', [])
        self.denull_zero = config.get('denull_zero', [])
        self.ts2dt = config.get('ts2dt', [])

    def old_fields(self, field_names):
        fragments = []
        for field in field_names:
            if field in self.denull:
                fragments.append(denull_query(field))
            elif field in self.denull_zero:
                fragments.append(denull_zero_query(field))
            elif field.endswith('_ts') and field[:-3] in self.ts2dt:
                fragments.append(f'FROM_UNIXTIME({field})')
            else:
                fragments.append(field)
        return ', '.join(fragments)

    def new_fields(self, field_names):
        fragments = []
        for field in field_names:
            if field.endswith('_ts') and field[:-3] in self.ts2dt:
                fragments.append(field[:-3] + '_dt')
            else:
                fragments.append(field)
        return ', '.join(fragments)

def migrate_table(db, table):
    cur = db.cursor()
    cur.execute(f'SELECT * FROM {table.name} LIMIT 1')

    field_names = [item[0] for item in cur.description]

    new_fields = table.new_fields(field_names)
    old_fields = table.old_fields(field_names)

    query = f'INSERT INTO {NEW_DB}.{table.name} ({new_fields}) SELECT {old_fields} FROM {table.name}'
    cur.execute(query)
    db.commit()

def main():
    db = get_db()

    cur = db.cursor()

    SKIP_TABLES = [
        'alembic_version', # not needed anymore
        'cashier' # will be reimported - old table has 'TEXT' columns because of pandas' quick-and-dirty operations
    ]

    TABLE_CONFIG = {
        'cm_customers': {
            'denull': [
                'last_name', 'gender', 'email', 'phone_number', 'phone_number2',
                'vk_link', 'fb_link', 'twitter_link', 'instagram_link', 'skype_link', 'website_link',
                'address', 'ref', 'ref2', 'comment',
            ],
            'denull_zero': ['time_discount', 'goods_discount'],
        },
        'events': {
            'denull': [
                'timepad_category_code', 'timing_description_override', 'fb_group', 'vk_group', 'master_id', 'posted_vk', 'posted_fb', 'posted_timepad',
            ],
            'denull_zero': ['timepad_prepaid_tickets', 'ready_to_post'],
        },
        'event_prototypes': {
            'denull': ['timepad_category_code', 'canceled_dates', 'timing_description_override', 'fb_group', 'vk_group'],
            'denull_zero': ['timepad_prepaid_tickets', 'active'],
        },
        'importers_log': {
            'ts2dt': ['start', 'end'],
        },
        'importers_state': {
            'ts2dt': ['last', 'until'],
        },
    }

    BOOST_TABLES = [
        'cm_orders',
        'event_prototypes',
        'events',
    ]

    for table_name in list_tables(db, boosted=BOOST_TABLES):
        if table_name in SKIP_TABLES:
            print(f'Skipping {table_name}')
            continue
        print(f'Migrating {table_name}')

        config = TABLE_CONFIG.get(table_name, {})
        table = Table(table_name, config)
        migrate_table(db, table)

if __name__ == '__main__':
    main()
