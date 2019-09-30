import pytest
pytestmark = pytest.mark.django_db

from freezegun import freeze_time

from django.utils import timezone
from kocherga.money.salaries import calculate_new_salaries
import kocherga.importer.daemon


def test_empty_new_salaries():
    with freeze_time('2019-03-05 10:00'):
        cm_importer_state = kocherga.importer.daemon.get_importer('cm').state
        cm_importer_state.last_dt = timezone.now()
        cm_importer_state.save()
        salaries = calculate_new_salaries()
    assert salaries
