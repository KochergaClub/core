import logging
logger = logging.getLogger(__name__)

from quart import Blueprint, send_file

from kocherga.images import image_storage

bp = Blueprint("images", __name__)

@bp.route("/images/<image_id>")
def r_image(image_id):
    filename = image_storage.get_filename(image_id)
    return send_file(filename)
