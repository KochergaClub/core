"""cookies-timing

Revision ID: e106eecbd350
Revises: 32f62603eb10
Create Date: 2018-07-21 01:56:33.665382+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'e106eecbd350'
down_revision = '32f62603eb10'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('cookie_picks', sa.Column('time', sa.Integer(), nullable=True))


def downgrade():
    op.drop_column('cookie_picks', 'time')
