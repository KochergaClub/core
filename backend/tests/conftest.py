import pytest
import freezegun

from django.conf import settings
from django.contrib.auth import get_user_model
from kocherga.staff.models import Member, AltEmail


from pathlib import Path
from datetime import datetime, timedelta

from kocherga.events.models import Event, EventPrototype
import kocherga.images
from kocherga.dateutils import TZ


@pytest.fixture(autouse=True)
def enable_db_access_for_all_tests(db):
    pass


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
    event.save()

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
def minimal_event():
    dt = datetime.now(TZ) + timedelta(days=1)
    event = Event(
        created=dt - timedelta(days=3),
        updated=dt - timedelta(days=3),
        start=dt,
        end=dt + timedelta(hours=1),
        title="бронь Летняя",
    )
    event.save()

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
    event.save()

    yield event

    event.delete()


@pytest.fixture
def common_events(db):
    for i in range(5):
        dt = datetime.now(TZ) + timedelta(days=i)
        Event.objects.create(
            start=dt,
            end=dt + timedelta(hours=1),
            title='test event',
        )


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


@pytest.fixture
def basic_user(db):
    User = get_user_model()
    email = 'somebody@example.com'
    user = User.objects.create_user(email=email)
    return user


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


@pytest.fixture()
def frozen_time():
    with freezegun.freeze_time(datetime(
            year=2019,
            month=11,
            day=1,
            hour=9,
            tzinfo=TZ
    )) as f:
        yield f
