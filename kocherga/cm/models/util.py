from datetime import datetime

from kocherga.datetime import TZ

def date_and_time_to_ts(d, t):
    return datetime.strptime("{} {}".format(d, t), "%d.%m.%Y %H:%M").replace(tzinfo=TZ).timestamp()
