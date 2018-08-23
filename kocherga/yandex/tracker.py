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

def import_gl_note(gl_note, gl_issue, yandex_issue_id):
    created_by = gl2tracker_users.get(gl_issue.author['username'])
    if not created_by:
        text += f"\n\n(Автор: {gl_issue.author['username']})"

    payload = {
        'text': gl_note.body,
        'createdAt': "2017-08-29T12:34:41.740+0000",
        'createdAt': dateutil.parser.parse(gl_note.created_at).strftime(DATE_FORMAT),
        'createdBy': created_by,
    }

    # updated_by = gl2tracker_users.get(gl_issue.author['username'])
    # if updated_by:
    #     payload['updatedAt'] = dateutil.parser.parse(gl_note.updated_at).strftime(DATE_FORMAT)
    #     payload['updatedBy'] = updated_by

    r = requests.post(
        f'{ROOT}/issues/{yandex_issue_id}/comments/_import',
        headers={
            'Authorization': f'OAuth {token()}',
            'X-Org-ID': str(ORG_ID),
        },
        json=payload
    )
    if r.status_code != 409:
        if r.status_code != 200:
            print(r.json())
            print(payload)
        r.raise_for_status()

def import_gl_issue(gl_issue, target_queue='TESTTT'):

    def gl_wiki_link(url):
        name = re.search(r'(\w+/issues/\d+)$', url).group(1)
        return f'(({url} {name}))'

    created_dt=dateutil.parser.parse(gl_issue.attributes["created_at"])
    updated_dt=dateutil.parser.parse(gl_issue.attributes["updated_at"])

    r = requests.post(
        f'{ROOT}/issues/_import',
        headers={
            'Authorization': f'OAuth {token()}',
            'X-Org-ID': str(ORG_ID),
        },
        json={
            'queue': target_queue,
            'summary': gl_issue.title,
            'createdAt': created_dt.strftime(DATE_FORMAT),
            'createdBy': gl2tracker_users.get(gl_issue.author['username'], 'slava'),
            'updatedAt': updated_dt.strftime(DATE_FORMAT),
            'updatedBy': gl2tracker_users.get(gl_issue.author['username'], 'slava'), # this is incorrect
            'description': f'{gl_wiki_link(gl_issue.web_url)}\n\n{gl_issue.description}',
            'unique': f'gitlab2-{gl_issue.id}',
        }
    )
    if r.status_code != 409:
        if r.status_code != 200:
            print(r.json())
        r.raise_for_status()

        for gl_note in gl_issue.notes.list(all=True, as_list=False):
            import_gl_note(gl_note, gl_issue, r.json()['key'])

def import_main_tasks():
    for gl_issue in kocherga.gitlab.main_project().issues.list(all=True, as_list=False):
        import_gl_issue(gl_issue)
