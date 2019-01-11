import pytest

import datetime
import logging

import kocherga.db
import kocherga.money.ofd.models

def test_documents():
    documents = kocherga.money.ofd.models.ofd.documents(datetime.date(2018,3,1))
    assert len(documents) > 3
    assert type(documents[0]) == kocherga.money.ofd.models.OfdDocument

@pytest.mark.slow
def test_import_all(db, caplog):
    caplog.set_level(logging.INFO)
    kocherga.money.ofd.models.Importer().import_all()
