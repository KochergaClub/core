import pytest
import subprocess

from pathlib import Path
import os
import os.path
import logging
from datetime import datetime, timedelta

os.environ['TIER'] = 'dev'

from kocherga.events.event import Event
from kocherga.events.prototype import EventPrototype
import kocherga.events.db
import kocherga.db
import kocherga.images

@pytest.fixture
def google_object():
    return {
        'created': '2017-09-01T17:59:38.000Z',
        'updated': '2017-10-01T18:00:00.000Z',
        'creator': { 'email': 'mmcleric@gmail.com' },
        'summary': 'бронь итальянский',
        'location': 'летняя',
        'start': {
            'dateTime': '2017-12-10T10:30:00+03:00',
        },
        'end': {
            'dateTime': '2017-12-10T12:30:00+03:00',
        },
        'id': '5p28o9767bch5oai1mefg45327_20171210T073000Z',
        'htmlLink': 'https://www.google.com/calendar/event?eid=NXAyOG85NzY3YmNoNW9haTFtZWZnNDUzMjdfMjAxNzEyMTBUMDczMDAwWiBsdjM5NjN1ZGN0dm9oOTQ0YzdkbGlrNXRkNEBn',
    }

@pytest.fixture(scope='session')
def vk_image_file():
    return str(Path(__file__).parent / 'images' / 'vk')

@pytest.fixture(scope='session')
def image_file():
    return str(Path(__file__).parent / 'images' / 'default')

@pytest.fixture
def db():
    # This is unfortunately fragile.
    logging.info('db fixture')
    kocherga.db.Session().close_all()
    kocherga.db.Session.remove()

    subprocess.run("mysql -uroot -e 'drop database if exists test'", shell=True)
    subprocess.run("mysql -uroot -e 'create database test'", shell=True)

    kocherga.db.DB_URL = 'mysql://root:@localhost/test'
    kocherga.config.config()['kocherga_db'] = kocherga.db.DB_URL
    kocherga.db.Session.configure(bind=kocherga.db.engine())
    kocherga.db.Base.metadata.create_all(kocherga.db.engine())
    logging.info('db fixture set')

@pytest.fixture
def image_storage(tmpdir):
    d = Path(tmpdir) / 'upload'
    d.mkdir()
    kocherga.config.config()['image_storage_dir'] = str(d)
    kocherga.images.image_storage = kocherga.images.init_global_image_storage()
    return kocherga.images.image_storage

@pytest.fixture
def event(image_file, vk_image_file):
    dt = datetime.today() + timedelta(days=3)
    event = Event(
        created_dt=dt - timedelta(days=5),
        updated_dt=dt - timedelta(days=5),
        start_dt=dt,
        end_dt=dt + timedelta(hours=1),
        title='Элиезер проповедь',
        description='chicken chicken chicken. chicken?\n\nchicken chicken chicken.',
        location='ГЭБ',
    )
    event.vk_group = 159971736

    event = kocherga.events.db.insert_event(event)
    with open(vk_image_file, 'rb') as fh:
        event.add_image('vk', fh)

    with open(image_file, 'rb') as fh:
        event.add_image('default', fh)

    kocherga.db.Session().commit()

    yield event

    kocherga.events.db.delete_event(event.google_id)
    kocherga.db.Session().commit()

@pytest.fixture
def event_for_timepad(event):
    event.image = None # FIXME - timepad can't fetch our local image, unfortunately
    return event

@pytest.fixture
def minimal_event():
    dt = datetime.today() + timedelta(days=1)
    event = Event(
        created_dt=dt - timedelta(days=3),
        updated_dt=dt - timedelta(days=3),
        start_dt=dt,
        end_dt=dt + timedelta(hours=1),
        title="бронь Летняя",
    )
    event = kocherga.events.db.insert_event(event)
    kocherga.db.Session().commit()

    yield event

    kocherga.events.db.delete_event(event.google_id)
    kocherga.db.Session().commit()

@pytest.fixture
def event_for_edits():
    dt = datetime.today() + timedelta(days=2)
    event = Event(
        created_dt=dt - timedelta(days=5),
        updated_dt=dt - timedelta(days=5),
        start_dt=dt,
        end_dt=dt + timedelta(hours=1),
        title="title doesn't matter",
        description="description doesn't matter"
    )
    event = kocherga.events.db.insert_event(event)
    kocherga.db.Session().commit()
    yield event

    kocherga.events.db.delete_event(event.google_id)
    kocherga.db.Session().commit()

@pytest.fixture
def imported_events(db):
    kocherga.events.db.Importer().import_all()

@pytest.fixture
def common_prototype(db):
    prototype = EventPrototype(
        title='четверговое событие',
        location='лекционная',
        weekday=4,
        hour=16,
        minute=30,
        length=120,
    )
    kocherga.db.Session().add(prototype)
    kocherga.db.Session().commit()
    return prototype
