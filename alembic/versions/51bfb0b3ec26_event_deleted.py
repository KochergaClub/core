"""event.deleted

Revision ID: 51bfb0b3ec26
Revises: 07c59eff85db
Create Date: 2018-06-30 17:02:22.096313+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '51bfb0b3ec26'
down_revision = '07c59eff85db'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('events', sa.Column('deleted', sa.Boolean(), nullable=True))


def downgrade():
    op.drop_column('events', 'deleted')
