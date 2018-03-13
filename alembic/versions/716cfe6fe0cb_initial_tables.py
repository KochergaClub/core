"""initial tables

Revision ID: 716cfe6fe0cb
Revises:
Create Date: 2018-03-14 01:18:32.275014

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '716cfe6fe0cb'
down_revision = None
branch_labels = None
depends_on = None

import kocherga.db
import kocherga.money.ofd

def upgrade():
    kocherga.db.create_all()


def downgrade():
    pass
