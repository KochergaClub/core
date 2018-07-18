"""prototype-id-inde

Revision ID: 334f0392216e
Revises: d02721842ff2
Create Date: 2018-07-18 19:49:32.279706+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '334f0392216e'
down_revision = 'd02721842ff2'
branch_labels = None
depends_on = None


def upgrade():
    op.create_index(op.f('ix_events_prototype_id'), 'events', ['prototype_id'], unique=False)


def downgrade():
    op.drop_index(op.f('ix_events_prototype_id'), table_name='events')
