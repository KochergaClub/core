"""cashier

Revision ID: 8e3c7d1bc8b7
Revises: 6d5921aea4b5
Create Date: 2018-03-18 05:40:42.417508+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8e3c7d1bc8b7'
down_revision = '6d5921aea4b5'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('cashier',
        sa.Column('id', sa.Integer()),
        sa.Column('date', sa.String(), nullable=False),
        sa.Column('shift', sa.String(), nullable=False),
        sa.Column('watchman', sa.String(), nullable=True),
        sa.Column('cash_income', sa.Integer(), nullable=True),
        sa.Column('electronic_income', sa.Integer(), nullable=True),
        sa.Column('total_income', sa.Integer(), nullable=True),
        sa.Column('current_cash', sa.Integer(), nullable=True),
        sa.Column('notes', sa.String(), nullable=True),
        sa.Column('discrepancy', sa.Integer(), nullable=True),
        sa.Column('spendings', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('date', 'shift')
    )

def downgrade():
    op.drop_table('cashier')
