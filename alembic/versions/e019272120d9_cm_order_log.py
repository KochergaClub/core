"""cm_order_log

Revision ID: e019272120d9
Revises: 5f19af0b2c56
Create Date: 2018-05-20 18:51:26.660104+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e019272120d9'
down_revision = '5f19af0b2c56'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('cm_order_log',
        sa.Column('order_id', sa.Integer(), nullable=False),
        sa.Column('operation_id', sa.Integer(), nullable=False),
        sa.Column('operation', sa.String(length=1024), nullable=True),
        sa.Column('ts', sa.Integer(), nullable=True),
        sa.Column('login', sa.String(length=80), nullable=True),
        sa.PrimaryKeyConstraint('order_id', 'operation_id')
    )


def downgrade():
    op.drop_table('cm_order_log')
