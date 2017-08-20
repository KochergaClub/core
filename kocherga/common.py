import os

def project_dir():
    return os.path.dirname(os.path.dirname(os.path.realpath(__file__)))

def credentials_dir():
    result = os.path.join(project_dir(), '.credentials')
    if not os.path.exists(result):
        os.makedirs(result)
    return result

class PublicError(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv
