import pytest

pytestmark = pytest.mark.ofd

import datetime
import logging
from freezegun import freeze_time

import kocherga.kkm.ofd
import kocherga.kkm.importer
import kocherga.kkm.models


# @pytest.mark.skip(reason="OFD API is down temporarily")
def test_documents():
    documents = kocherga.kkm.ofd.ofd.documents(datetime.date(2019, 3, 1))
    assert len(documents) > 3
    assert isinstance(documents[0], kocherga.kkm.models.OfdDocument)


@pytest.mark.slow
def test_import_all(db, caplog):
    caplog.set_level(logging.INFO)
    with freeze_time('2018-12-30 10:00'):
        kocherga.kkm.importer.Importer().import_all()
