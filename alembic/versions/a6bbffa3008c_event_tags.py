"""event-tags

Revision ID: a6bbffa3008c
Revises: e106eecbd350
Create Date: 2018-07-24 16:11:48.992018+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a6bbffa3008c'
down_revision = 'e106eecbd350'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('event_tags',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('event_id', sa.String(length=100), nullable=False),
        sa.Column('tag', sa.String(length=40), nullable=False),
        sa.ForeignKeyConstraint(['event_id'], ['events.google_id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('event_tags')
