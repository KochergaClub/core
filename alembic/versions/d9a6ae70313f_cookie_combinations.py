"""cookie combinations

Revision ID: d9a6ae70313f
Revises: 1621818b2e3d
Create Date: 2018-08-21 12:51:07.681420+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'd9a6ae70313f'
down_revision = '1621818b2e3d'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('cookie_combinations',
        sa.Column('combination_id', sa.Integer(), nullable=False),
        sa.Column('happy_users', sa.Integer(), nullable=False),
        sa.Column('total_users', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('combination_id')
    )

    op.create_table('cookie_combination_items',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('combination_id', sa.Integer(), nullable=False),
        sa.Column('position_id', sa.Integer(), nullable=False),
        sa.Column('cookie_id', sa.String(length=32), nullable=False),
        sa.ForeignKeyConstraint(['combination_id'], ['cookie_combinations.combination_id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('combination_id', 'position_id')
    )


def downgrade():
    op.drop_table('cookie_combination_items')
    op.drop_table('cookie_combinations')
