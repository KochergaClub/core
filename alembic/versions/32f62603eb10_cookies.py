"""cookies

Revision ID: 32f62603eb10
Revises: 772fb03e40b0
Create Date: 2018-07-21 01:47:46.085774+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '32f62603eb10'
down_revision = '772fb03e40b0'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('cookie_picks',
        sa.Column('pick_id', sa.Integer(), nullable=False),
        sa.Column('ts', sa.DateTime(), nullable=True),
        sa.Column('cookie_id', sa.String(length=32), nullable=False),
        sa.Column('against_id', sa.String(length=32), nullable=False),
        sa.Column('position', sa.Integer(), nullable=True),
        sa.Column('user', sa.String(length=255), nullable=True),
        sa.PrimaryKeyConstraint('pick_id')
    )


def downgrade():
    op.drop_table('cookie_picks')
