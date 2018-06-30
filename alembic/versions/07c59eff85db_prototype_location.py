"""prototype.location

Revision ID: 07c59eff85db
Revises: 1cd4e3170af4
Create Date: 2018-06-30 15:30:05.944326+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '07c59eff85db'
down_revision = '1cd4e3170af4'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('event_prototypes', sa.Column('location', sa.String(length=255), nullable=True))


def downgrade():
    op.drop_column('event_prototypes', 'location')
