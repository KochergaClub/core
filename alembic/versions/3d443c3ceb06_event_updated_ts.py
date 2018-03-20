"""event updated_ts

Revision ID: 3d443c3ceb06
Revises: 822239ca957f
Create Date: 2018-03-21 00:56:17.641310+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3d443c3ceb06'
down_revision = '822239ca957f'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('events', sa.Column('updated_ts', sa.Integer(), nullable=True))


def downgrade():
    op.drop_column('events', 'updated_ts')
