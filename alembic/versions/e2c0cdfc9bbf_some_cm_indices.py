"""some cm indices

Revision ID: e2c0cdfc9bbf
Revises: d3037ab49c64
Create Date: 2018-11-19 20:40:07.056703+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'e2c0cdfc9bbf'
down_revision = 'd3037ab49c64'
branch_labels = None
depends_on = None


def upgrade():
    op.create_index(op.f('ix_cm_customers_card_id'), 'cm_customers', ['card_id'], unique=False)
    op.create_index(op.f('ix_cm_customers_email'), 'cm_customers', ['email'], unique=False)
    op.create_index(op.f('ix_cm_order_log_ts'), 'cm_order_log', ['ts'], unique=False)
    op.create_foreign_key(None, 'cm_order_log', 'cm_orders', ['order_id'], ['order_id'])
    op.create_index(op.f('ix_cm_orders_card_id'), 'cm_orders', ['card_id'], unique=False)
    op.create_index(op.f('ix_cm_orders_end_ts'), 'cm_orders', ['end_ts'], unique=False)
    op.create_index(op.f('ix_cm_orders_start_ts'), 'cm_orders', ['start_ts'], unique=False)


def downgrade():
    op.drop_index(op.f('ix_cm_orders_start_ts'), table_name='cm_orders')
    op.drop_index(op.f('ix_cm_orders_end_ts'), table_name='cm_orders')
    op.drop_index(op.f('ix_cm_orders_card_id'), table_name='cm_orders')
    op.drop_constraint(None, 'cm_order_log', type_='foreignkey')
    op.drop_index(op.f('ix_cm_order_log_ts'), table_name='cm_order_log')
    op.drop_index(op.f('ix_cm_customers_email'), table_name='cm_customers')
    op.drop_index(op.f('ix_cm_customers_card_id'), table_name='cm_customers')
