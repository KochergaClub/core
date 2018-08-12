"""timeclub24 visitors

Revision ID: 1621818b2e3d
Revises: 3bdef9f2c57e
Create Date: 2018-08-12 18:00:37.723004+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '1621818b2e3d'
down_revision = '3bdef9f2c57e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('timeclub24_visitors',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('ts', sa.DateTime(), nullable=True),
        sa.Column('venue', sa.String(length=100), nullable=False),
        sa.Column('visitors', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('ts', 'venue')
    )


def downgrade():
    op.drop_table('timeclub24_visitors')
