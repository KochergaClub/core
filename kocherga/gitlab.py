import logging
logger = logging.getLogger(__name__)

import dateutil.parser
from datetime import datetime

import gitlab

from sqlalchemy import Column, Integer, String

import kocherga.config
import kocherga.secrets
import kocherga.db
import kocherga.importer.base

SERVER = 'https://gitlab.com'

def iso2ts(s):
    return int(dateutil.parser.parse(s).timestamp())

class Issue(kocherga.db.Base):
    __tablename__ = 'gitlab_issues'

    id = Column(Integer, primary_key=True)
    username = Column(String(100))
    created_ts = Column(Integer)
    updated_ts = Column(Integer)

    @classmethod
    def from_gl(cls, gl_issue):
        return Issue(
            id=gl_issue.id,
            username=gl_issue.attributes['author']['username'],
            created_ts=iso2ts(gl_issue.attributes['created_at']),
            updated_ts=iso2ts(gl_issue.attributes['updated_at']),
        )

class IssueNote(kocherga.db.Base):
    __tablename__ = 'gitlab_issue_notes'

    id = Column(Integer, primary_key=True)
    username = Column(String(100))
    created_ts = Column(Integer)
    updated_ts = Column(Integer)

    @classmethod
    def from_gl(cls, gl_note):
        return IssueNote(
            id=gl_note.id,
            username=gl_note.attributes['author']['username'],
            created_ts=iso2ts(gl_note.attributes['created_at']),
            updated_ts=iso2ts(gl_note.attributes['updated_at']),
        )

def get_token():
    return kocherga.secrets.plain_secret('gitlab_token')

def get_gl():
    return gitlab.Gitlab(SERVER, private_token=get_token())

def main_project():
    return get_gl().projects.get('kocherga/main')

class Importer(kocherga.importer.base.IncrementalImporter):
    def init_db(self):
        IssueNote.__table__.create(bind=kocherga.db.engine())
        Issue.__table__.create(bind=kocherga.db.engine())

    def get_initial_dt(self):
        return datetime(2017,10,1, tzinfo=kocherga.config.TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime, session) -> datetime:
        issue = None
        for gl_issue in main_project().issues.list(updated_after=from_dt.isoformat(), order_by='updated_at', sort='asc', all=True):
            logger.info(f'Importing issue {gl_issue.iid}')
            issue = Issue.from_gl(gl_issue)
            session.merge(issue)

            for gl_note in gl_issue.notes.list(all=True):
                note = IssueNote.from_gl(gl_note)
                session.merge(note)

        if not issue:
            return self.get_initial_dt()
        return datetime.fromtimestamp(issue.updated_ts, kocherga.config.TZ)
