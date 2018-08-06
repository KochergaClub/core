"""event-prototype-tags

Revision ID: 3bdef9f2c57e
Revises: b08f094996d1
Create Date: 2018-08-06 20:30:42.606477+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '3bdef9f2c57e'
down_revision = 'b08f094996d1'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('event_prototype_tags',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('prototype_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=40), nullable=False),
        sa.ForeignKeyConstraint(['prototype_id'], ['event_prototypes.prototype_id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('prototype_id', 'name')
    )


def downgrade():
    op.drop_table('event_prototype_tags')
