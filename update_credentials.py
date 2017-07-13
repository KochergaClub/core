import kocherga.calendar_api
from oauth2client import tools

import argparse

flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
kocherga.calendar_api.update_credentials(flags)
