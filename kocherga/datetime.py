from datetime import timedelta

# TODO - base this on kocherga.config.TZ
MSK_DATE_FORMAT = '%Y-%m-%dT%H:%M:%S+03:00'

def dts(dt):
    return dt.strftime(MSK_DATE_FORMAT)

def date_chunks(from_dt, to_dt, step=timedelta(days=28)):
    chunk_from_dt = from_dt
    chunk_to_dt = from_dt + step

    while chunk_from_dt < to_dt:
        yield (chunk_from_dt, min(chunk_from_dt + step, to_dt))
        chunk_from_dt += step

def inflected_month(dt):
    return [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ][dt.month - 1]
