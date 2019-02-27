import inspect
from datetime import datetime

import kocherga.dateutils

def test_date_chunks():
    chunks = kocherga.dateutils.date_chunks(datetime(2017,1,1), datetime(2017,12,15))
    assert inspect.isgenerator(chunks)

    chunks = list(chunks)
    assert len(chunks) == 13
