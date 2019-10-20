import pytest

from django.conf import settings
from django.contrib.auth import get_user_model
from kocherga.staff.models import Member, AltEmail


import googleapiclient.errors

from pathlib import Path
from datetime import datetime, timedelta

from kocherga.events.models import Event, EventPrototype
import kocherga.events.db
import kocherga.events.importer
import kocherga.images
from kocherga.dateutils import TZ


@pytest.fixture
def google_object():
    obj = {
        'created': '2017-09-01T17:59:38.000Z',
        'updated': '2017-10-01T18:00:00.000Z',
        'creator': {'email': 'mmcleric@gmail.com'},
        'summary': 'бронь итальянский',
        'location': 'летняя',
        'start': {
            'dateTime': '2017-12-10T10:30:00+03:00',
        },
        'end': {
            'dateTime': '2017-12-10T12:30:00+03:00',
        },
    }

    obj = kocherga.events.google.insert_event(obj)
    yield obj

    try:
        kocherga.events.google.delete_event(obj)
    except googleapiclient.errors.HttpError:
        pass  # might be deleted already


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
    dt = datetime.now(TZ) + timedelta(days=3)
    event = Event(
        created=dt - timedelta(days=5),
        updated=dt - timedelta(days=5),
        start=dt,
        end=dt + timedelta(hours=1),
        title='Элиезер проповедь',
        description='chicken chicken chicken. chicken?\n\nchicken chicken chicken.',
        location='ГЭБ',
        event_type='public',
    )
    event = kocherga.events.db.insert_event(event)

    event.vk_announcement.group = 'event159971736'
    event.vk_announcement.save()
    event.fb_announcement.group = 'nonexisting_facebook_group'
    event.fb_announcement.save()

    with open(vk_image_file, 'rb') as fh:
        event.vk_announcement.add_image(fh)

    with open(image_file, 'rb') as fh:
        event.add_image('default', fh)

    yield event

    event.delete()


@pytest.fixture
def event_for_timepad(event):
    event.image = None  # FIXME - timepad can't fetch our local image, unfortunately
    return event


@pytest.fixture
def minimal_event():
    dt = datetime.now(TZ) + timedelta(days=1)
    event = Event(
        created=dt - timedelta(days=3),
        updated=dt - timedelta(days=3),
        start=dt,
        end=dt + timedelta(hours=1),
        title="бронь Летняя",
    )
    event = kocherga.events.db.insert_event(event)

    yield event

    event.delete()


@pytest.fixture
def event_for_edits():
    dt = datetime.now(TZ) + timedelta(days=2)
    event = Event(
        created=dt - timedelta(days=5),
        updated=dt - timedelta(days=5),
        start=dt,
        end=dt + timedelta(hours=1),
        title="title doesn't matter",
        description="description doesn't matter"
    )
    event = kocherga.events.db.insert_event(event)
    yield event

    event.delete()


@pytest.fixture
def imported_events(db, transactional_db):
    kocherga.events.importer.Importer().import_all()


@pytest.fixture
def common_prototype(db):
    prototype = EventPrototype(
        title='четверговое событие',
        location='лекционная',
        weekday=4,
        hour=16,
        minute=30,
        length=120,
        vk_group='whatever',
        fb_group='kocherga.whatever',
    )
    prototype.save()
    return prototype


@pytest.fixture
def common_team(db):
    Member.objects.create(
        user=get_user_model().objects.create_user('yudkowsky@example.com', is_staff=True),
        short_name='Элиезер',
        is_current=True,
    )

    Member.objects.create(
        user=get_user_model().objects.create_user('ssc@example.com', is_staff=True),
        short_name='Скотт',
        is_current=True,
    )

    m = Member.objects.create(
        user=get_user_model().objects.create_user('test@kocherga-club.ru', is_staff=True),
        short_name='Слава',
        role='WATCHMAN',
        is_current=True,
    )
    AltEmail.objects.create(member=m, email='mmcleric@gmail.com')

    Member.objects.create(
        user=get_user_model().objects.create_user('not.about.email@example.com'),
        short_name='Робин',
        is_current=False,
    )


# Override pytest-django's admin_user fixture, since it's not compatible
# with our User.objects.create_superuser(email, password).
@pytest.fixture
def admin_user(db):
    User = get_user_model()
    email = 'admin@example.com'

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        user = User.objects.create_superuser(email=email, password='password')

    return user


@pytest.fixture()
def client():
    from rest_framework.test import APIClient
    return APIClient()


@pytest.fixture()
def admin_client(client, admin_user):
    client.login(username=admin_user.email, password="password")
    return client
