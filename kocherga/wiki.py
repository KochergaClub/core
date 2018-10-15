import mwclient

from kocherga.config import config
import kocherga.secrets

WIKI_DOMAIN = config()["wiki"]["domain"]
WIKI_USER = config()["wiki"]["bot"]["username"]
WIKI_SITE = None


def get_wiki():
    global WIKI_SITE
    if not WIKI_SITE:
        site = mwclient.Site(WIKI_DOMAIN, path="/")
        site.login(WIKI_USER, kocherga.secrets.plain_secret("wiki_password"))
        WIKI_SITE = site
    return WIKI_SITE
