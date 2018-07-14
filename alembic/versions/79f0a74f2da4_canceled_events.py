"""canceled_events

Revision ID: 79f0a74f2da4
Revises: 2e5819792a00
Create Date: 2018-07-14 22:10:37.078984+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '79f0a74f2da4'
down_revision = '2e5819792a00'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('event_prototypes', sa.Column('canceled_dates', sa.Text(), nullable=True))


def downgrade():
    op.drop_column('event_prototypes', 'canceled_dates')
