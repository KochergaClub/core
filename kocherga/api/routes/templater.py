from flask import Blueprint, request, render_template
import datetime

from kocherga.api.auth import auth

bp = Blueprint('templater', __name__)

@bp.app_template_filter()
def parse_date(value, fmt):
    return datetime.datetime.strptime(value, fmt)

@bp.route('/templater/html/<name>')
#@auth('kocherga')
def generate_html(name):
    args = {}

    args.update(request.args.to_dict())
    args.update(request.form)
    return render_template(f'templater/{name}.html', **args)
