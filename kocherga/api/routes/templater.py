from quart import Blueprint, request, render_template
import datetime

from kocherga.api.auth import auth

bp = Blueprint('templater', __name__)

@bp.app_template_filter()
def parse_date(value, fmt):
    return datetime.datetime.strptime(value, fmt)

@bp.route('/templater/html/<name>')
#@auth('kocherga')
async def generate_html(name):
    args = {}

    for k, v in request.args.items():
        args[k] = v
    args.update(await request.form)
    return await render_template(f'templater/{name}.html', **args)
