"""event prototypes table

Revision ID: 1cd4e3170af4
Revises: e28400873483
Create Date: 2018-06-23 20:21:41.364119+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '1cd4e3170af4'
down_revision = 'e28400873483'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('event_prototypes',
        sa.Column('prototype_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=True),
        sa.Column('summary', sa.Text(), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('vk_group', sa.String(length=40), nullable=True),
        sa.Column('fb_group', sa.String(length=40), nullable=True),
        sa.Column('weekday', sa.Integer(), nullable=True),
        sa.Column('hour', sa.Integer(), nullable=True),
        sa.Column('minute', sa.Integer(), nullable=True),
        sa.Column('length', sa.Integer(), nullable=True),
        sa.Column('active', sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint('prototype_id')
    )


def downgrade():
    op.drop_table('event_prototypes')
