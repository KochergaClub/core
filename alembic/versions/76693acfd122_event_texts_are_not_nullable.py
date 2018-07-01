"""event texts are not nullable

Revision ID: 76693acfd122
Revises: 51bfb0b3ec26
Create Date: 2018-07-01 19:05:21.488650+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '76693acfd122'
down_revision = '51bfb0b3ec26'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('events', 'description',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               nullable=False)
    op.alter_column('events', 'summary',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               nullable=False)


def downgrade():
    op.alter_column('events', 'summary',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               nullable=True)
    op.alter_column('events', 'description',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               nullable=True)
