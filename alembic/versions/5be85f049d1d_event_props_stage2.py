"""event-props-stage2

Revision ID: 5be85f049d1d
Revises: 7f8341aceb1a
Create Date: 2018-04-02 17:59:43.072405+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5be85f049d1d'
down_revision = '7f8341aceb1a'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('events', sa.Column('asked_for_visitors_ts', sa.Integer(), nullable=True))
    op.add_column('events', sa.Column('ready_to_post', sa.Boolean(), nullable=True))


def downgrade():
    op.drop_column('events', 'ready_to_post')
    op.drop_column('events', 'asked_for_visitors_ts')
