import logging
logger = logging.getLogger(__name__)

import re
import requests
import dateutil.parser

import kocherga.secrets
import kocherga.gitlab
ROOT = 'https://api.tracker.yandex.net/v2'

ORG_ID = 649407

def token():
    return kocherga.secrets.plain_secret('yandex_token')

gl2tracker_users = {
    'berekuk': 'slava',
    'mtmtmt': 'tanya',
    'piongaibaryan': 'pion',
}

DATE_FORMAT = "%Y-%m-%dT%H:%M:%S.000+03:00"

class ConflictException(Exception):
    pass

def api_call(method, url, data={}):
    if method == "GET":
        r = requests.get(
            f"{ROOT}/{url}",
            headers={
                'Authorization': f'OAuth {token()}',
                'X-Org-ID': str(ORG_ID),
            },
        )
    elif method == "POST":
        r = requests.post(
            f"{ROOT}/{url}",
            headers={
                'Authorization': f'OAuth {token()}',
                'X-Org-ID': str(ORG_ID),
            },
            json=data,
        )

    if r.status_code == 409:
        raise ConflictException()
    if r.status_code >= 400:
        logger.warning(data)
        raise Exception(f"Error: {r.status_code} {r.reason}\n\n{r.text}")
    r.raise_for_status()

    return r.json()

def import_gl_note(gl_note, gl_issue, yandex_issue_id):
    created_by = gl2tracker_users.get(gl_note.author['username'])
    text = gl_note.body
    if not created_by:
        text += f"\n\n(Автор: {gl_note.author['username']})"
        created_by = 'info'

    created_dt = dateutil.parser.parse(gl_note.created_at)
    issue_updated_dt = dateutil.parser.parse(gl_issue.attributes["updated_at"])
    if created_dt > issue_updated_dt:
        created_dt = issue_updated_dt

    logger.info('note dt: ' + str(created_dt))
    payload = {
        'text': text,
        'createdAt': created_dt.strftime(DATE_FORMAT),
        'createdBy': created_by,
    }

    # updated_by = gl2tracker_users.get(gl_issue.author['username'])
    # if updated_by:
    #     payload['updatedAt'] = dateutil.parser.parse(gl_note.updated_at).strftime(DATE_FORMAT)
    #     payload['updatedBy'] = updated_by

    api_call('POST', f'issues/{yandex_issue_id}/comments/_import', payload)

IMPORT_UNIQUE_KEY = 'gitlab6'
def import_gl_issue(gl_issue, target_queue):

    def gl_wiki_link(url):
        name = re.search(r'(\w+/issues/\d+)$', url).group(1)
        return f'(({url} {name}))'

    created_dt=dateutil.parser.parse(gl_issue.attributes["created_at"])
    updated_dt=dateutil.parser.parse(gl_issue.attributes["updated_at"])

    try:
        logger.info(gl_issue.id)
        request_body = {
            'queue': target_queue,
            'summary': gl_issue.title,
            'createdAt': created_dt.strftime(DATE_FORMAT),
            'createdBy': gl2tracker_users.get(gl_issue.author['username'], 'info'),
            'updatedAt': updated_dt.strftime(DATE_FORMAT),
            'updatedBy': gl2tracker_users.get(gl_issue.author['username'], 'info'),
            'description': f'{gl_wiki_link(gl_issue.web_url)}\n\n{gl_issue.description}',
            'tags': [s.replace(' ', '_').replace(',', '_') for s in gl_issue.attributes.get('labels', [])],
            'unique': f'{IMPORT_UNIQUE_KEY}-{gl_issue.id}',
            'status': 1, # can be overriden later
        }
        if gl_issue.attributes['assignee']:
            request_body['assignee'] = gl2tracker_users.get(gl_issue.attributes['assignee']['username'], 'info')

        notes = gl_issue.notes.list(all=True, as_list=True)
        if gl_issue.state == 'closed':
            request_body['status'] = 8
            request_body['resolution'] = 1
            close_notes = [n for n in notes if n.body == 'closed' and n.system == True]
            if len(close_notes) == 0:
                # moved?
                moved_notes = [n for n in notes if n.body.startswith('moved to ') and n.system == True]
                close_note = moved_notes[0]
            else:
                close_note = close_notes[0]

            request_body['resolvedAt'] = min(dateutil.parser.parse(close_note.attributes["created_at"]), updated_dt).strftime(DATE_FORMAT)
            request_body['resolvedBy'] = gl2tracker_users.get(close_note.author['username'], 'info')

        result = api_call('POST', 'issues/_import', request_body)

        for gl_note in notes:
            import_gl_note(gl_note, gl_issue, result['key'])

    except ConflictException:
        pass # whatever

def import_from_gitlab(gitlab_project_name, tracker_queue_name):
    gitlab_project = kocherga.gitlab.get_gl().projects.get(gitlab_project_name)
    for gl_issue in gitlab_project.issues.list(all=True, as_list=False, order_by='created_at', sort='asc'):
        import_gl_issue(gl_issue, tracker_queue_name)
