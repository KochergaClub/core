import pytest

from django.conf import settings

from pathlib import Path
from datetime import datetime, timedelta

from kocherga.events.models import Event, EventPrototype
import kocherga.events.db
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
def image_storage(tmpdir):
    d = Path(tmpdir) / 'upload'
    d.mkdir()
    settings.DATA_DIR = str(tmpdir)
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
        event_type='public',
    )
    event.vk_group = 'event159971736'
    # event.fb_group = 'nonexisting_facebook_group'

    event = kocherga.events.db.insert_event(event)
    with open(vk_image_file, 'rb') as fh:
        event.add_image('vk', fh)

    with open(image_file, 'rb') as fh:
        event.add_image('default', fh)

    # session can be reset after the test, so we need to store this and don't reference our event after the yield
    event_id = event.google_id

    yield event

    kocherga.events.db.delete_event(event_id)

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

    yield event

    kocherga.events.db.delete_event(event.google_id)

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
    yield event

    kocherga.events.db.delete_event(event.google_id)

@pytest.fixture
def imported_events(db, transactional_db):
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
    prototype.save()
    return prototype

@pytest.fixture
def common_team(db):
    from django.contrib.auth import get_user_model
    from kocherga.staff.models import Member, AltEmail

    Member.objects.create(
        user=get_user_model().objects.create_user('yudkowsky@example.com'),
        short_name='Элиезер',
        is_current=True,
    )

    Member.objects.create(
        user=get_user_model().objects.create_user('ssc@example.com'),
        short_name='Скотт',
        is_current=True,
    )

    m = Member.objects.create(
        user=get_user_model().objects.create_user('test@kocherga-club.ru'),
        short_name='Слава',
        is_current=True,
    )
    AltEmail.objects.create(member=m, email='mmcleric@gmail.com')

    Member.objects.create(
        user=get_user_model().objects.create_user('not.about.email@example.com'),
        short_name='Робин',
        is_current=False,
    )
