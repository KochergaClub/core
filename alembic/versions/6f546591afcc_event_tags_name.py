"""event-tags-name

Revision ID: 6f546591afcc
Revises: a6bbffa3008c
Create Date: 2018-07-24 16:45:35.091730+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '6f546591afcc'
down_revision = 'a6bbffa3008c'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('event_tags', sa.Column('name', sa.String(length=40), nullable=False))
    op.drop_column('event_tags', 'tag')


def downgrade():
    op.add_column('event_tags', sa.Column('tag', mysql.VARCHAR(collation='utf8_unicode_ci', length=40), nullable=False))
    op.drop_column('event_tags', 'name')
