import datetime
import logging

import kocherga.db
import kocherga.money.ofd

def test_documents():
    documents = kocherga.money.ofd.ofd.documents(datetime.date(2018,3,1))
    assert len(documents) > 3
    assert type(documents[0]) == kocherga.money.ofd.OfdDocument

def test_import_all(db, caplog):
    caplog.set_level(logging.INFO)
    kocherga.db.create_all()
    kocherga.money.ofd.import_all()
