MSK_DATE_FORMAT = '%Y-%m-%dT%H:%M:%S+03:00'

def dts(dt):
    return dt.strftime(MSK_DATE_FORMAT)
