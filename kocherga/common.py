import os

def project_dir():
    return os.path.dirname(os.path.dirname(os.path.realpath(__file__)))

def credentials_dir():
    result = os.path.join(project_dir(), '.credentials')
    if not os.path.exists(result):
        os.makedirs(result)
    return result
