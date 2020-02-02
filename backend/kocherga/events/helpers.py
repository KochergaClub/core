import datetime
import re
import imghdr

from kocherga.error import PublicError
from kocherga.dateutils import TZ

from django.core.files.images import ImageFile
from wagtail.images.models import Image


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


def create_image_from_fh(fh, title, basename) -> Image:
    image = Image(title=title)
    image_type = imghdr.what(fh)
    if image_type == 'png':
        ext = 'png'
    elif image_type == 'jpeg':
        ext = 'jpg'
    else:
        raise Exception(f"Unknown image type {image_type}")

    image.file.save(basename + '.' + ext, ImageFile(fh))
    image.save()
    return image
