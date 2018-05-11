"""event_timing_description

Revision ID: 2fbe41b9f92a
Revises: 55577efe0b5b
Create Date: 2018-05-11 18:26:23.872833+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2fbe41b9f92a'
down_revision = '55577efe0b5b'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('events', sa.Column('timing_description_override', sa.String(length=255), nullable=True))


def downgrade():
    op.drop_column('events', 'timing_description_override')
