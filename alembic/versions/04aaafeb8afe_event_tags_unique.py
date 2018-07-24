"""event-tags-unique

Revision ID: 04aaafeb8afe
Revises: 6f546591afcc
Create Date: 2018-07-24 17:23:32.232690+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '04aaafeb8afe'
down_revision = '6f546591afcc'
branch_labels = None
depends_on = None


def upgrade():
    op.create_unique_constraint(None, 'event_tags', ['event_id', 'name'])


def downgrade():
    op.drop_constraint(None, 'event_tags', type_='unique')
