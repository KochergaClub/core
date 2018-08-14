import datetime
import re

from kocherga.error import PublicError
from kocherga.config import TZ

def build_start_end_dt(date_str, start_time, end_time):
    dt = datetime.datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=TZ)

    def parse_time(t):
        time_parsed = re.match(r"(\d\d):(\d\d)$", t)
        if not time_parsed:
            raise PublicError("Invalid time {}.".format(t))

        result_dt = dt

        (hour, minute) = (int(time_parsed.group(1)), int(time_parsed.group(2)))
        if hour == 24:
            hour = 0
            result_dt += datetime.timedelta(days=1)

        if minute not in (0, 30):
            raise PublicError("Only 30-minute intervals are allowed")

        return result_dt.replace(hour=hour, minute=minute)

    start_dt = parse_time(start_time)
    end_dt = parse_time(end_time)

    if end_dt <= start_dt:
        raise PublicError("Event should end after it starts.")

    return (start_dt, end_dt)
