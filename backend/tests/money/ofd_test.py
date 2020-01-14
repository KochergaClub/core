import pytest
pytestmark = pytest.mark.ofd

import datetime
import logging
from freezegun import freeze_time

import kocherga.money.ofd.api
import kocherga.money.ofd.importer


@pytest.mark.skip(reason="OFD API is down temporarily")
def test_documents():
    documents = kocherga.money.ofd.api.ofd.documents(datetime.date(2019, 3, 1))
    assert len(documents) > 3
    assert type(documents[0]) == kocherga.money.ofd.models.OfdDocument


@pytest.mark.slow
def test_import_all(db, caplog):
    caplog.set_level(logging.INFO)
    with freeze_time('2018-12-30 10:00'):
        kocherga.money.ofd.importer.Importer().import_all()
