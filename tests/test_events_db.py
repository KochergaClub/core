import datetime

from kocherga.events.event import Event
import kocherga.events.db

class TestGetEvent:
    def test_get(self, event):
        e = kocherga.events.db.get_event(event.google_id)
        assert e
        assert type(e) == Event

        assert type(e.created_dt) == datetime.datetime
        assert type(e.start_dt) == datetime.datetime
        assert type(e.end_dt) == datetime.datetime
        assert e.title == 'Элиезер проповедь'
        assert e.description.startswith('chicken')
        assert '@' in e.creator
        assert e.is_master == False
        assert e.master_id is None

        assert e.get_room() == 'гэб'
        assert e.is_private() == False

        print(e.to_dict())

class TestListEvents:
    def test_list(self):
        out = kocherga.events.db.list_events()
        assert type(out) == list
        assert len(out) > 10
        assert type(out[0]) == Event

    def test_list_with_date(self):
        out = kocherga.events.db.list_events(date=datetime.datetime.today().date())
        assert type(out) == list
        assert 0 < len(out) < 20
        assert type(out[0]) == Event

class TestPatchEvent:
    def test_patch(self, event_for_edits):
        event = event_for_edits
        patched = kocherga.events.db.patch_event(event.google_id, { 'title': 'blah' })
        assert type(patched) == Event
        assert patched.title == 'blah'

class TestAddImage:
    def test_add_image(self, event_for_edits, image_file):
        event = event_for_edits

        with open(image_file, 'rb') as fh:
            kocherga.events.db.add_image(event.google_id, 'vk', fh)

        event = kocherga.events.db.get_event(event.google_id) # needs to be reloaded

        print(event.image_file('vk'))
        assert event.image_file('vk')
