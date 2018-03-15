import inspect
from datetime import datetime

import kocherga.datetime

def test_date_chunks():
    chunks = kocherga.datetime.date_chunks(datetime(2017,1,1), datetime(2017,12,15))
    assert inspect.isgenerator(chunks)

    chunks = list(chunks)
    print(chunks)
    assert len(chunks) == 12
