"""event prototypes

Revision ID: e28400873483
Revises: 37d8ef2f0036
Create Date: 2018-06-23 20:15:48.465099+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'e28400873483'
down_revision = '37d8ef2f0036'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('events', sa.Column('prototype_id', sa.Integer(), nullable=True))


def downgrade():
    op.drop_column('events', 'prototype_id')
