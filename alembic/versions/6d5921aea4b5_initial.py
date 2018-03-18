"""empty message

Revision ID: 6d5921aea4b5
Revises: 
Create Date: 2018-03-18 03:38:29.104409+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6d5921aea4b5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('cm_orders',
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=True),
    sa.Column('start_ts', sa.Integer(), nullable=True),
    sa.Column('end_ts', sa.Integer(), nullable=True),
    sa.Column('people', sa.Integer(), nullable=True),
    sa.Column('visit_length', sa.Integer(), nullable=True),
    sa.Column('full_visit_length', sa.Integer(), nullable=True),
    sa.Column('order_value', sa.Integer(), nullable=True),
    sa.Column('time_value', sa.Integer(), nullable=True),
    sa.Column('stuff_value', sa.Integer(), nullable=True),
    sa.Column('payment_type', sa.String(), nullable=True),
    sa.Column('is_fixed', sa.String(), nullable=True),
    sa.Column('client_name', sa.String(), nullable=True),
    sa.Column('manager', sa.String(), nullable=True),
    sa.Column('tariff_time', sa.String(), nullable=True),
    sa.Column('tariff_plan', sa.String(), nullable=True),
    sa.Column('comment', sa.String(), nullable=True),
    sa.Column('history', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('order_id')
    )
    op.create_table('events',
    sa.Column('google_id', sa.String(), nullable=False),
    sa.Column('start_ts', sa.Integer(), nullable=True),
    sa.Column('end_ts', sa.Integer(), nullable=True),
    sa.Column('created_ts', sa.Integer(), nullable=True),
    sa.Column('creator', sa.String(), nullable=True),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('google_link', sa.String(), nullable=True),
    sa.Column('is_master', sa.Boolean(), nullable=True),
    sa.Column('master_id', sa.String(), nullable=True),
    sa.Column('visitors', sa.Integer(), nullable=True),
    sa.Column('event_type', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('google_id')
    )
    op.create_table('importers_log',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('timestamp', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_importers_log_name'), 'importers_log', ['name'], unique=False)
    op.create_table('importers_state',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('timestamp', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('name')
    )
    op.create_table('ofd_documents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('timestamp', sa.Integer(), nullable=True),
    sa.Column('cash', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('electronic', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('total', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.Column('check_type', sa.Enum('income', 'refund_income', 'expense', 'refund_expense', name='checktype'), nullable=True),
    sa.Column('shift_id', sa.Integer(), nullable=True),
    sa.Column('request_id', sa.Integer(), nullable=True),
    sa.Column('operator', sa.String(), nullable=True),
    sa.Column('operator_inn', sa.Integer(), nullable=True),
    sa.Column('fiscal_sign', sa.Integer(), nullable=True),
    sa.Column('midday_ts', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tochka_records',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('ts', sa.Integer(), nullable=True),
    sa.Column('debit', sa.Boolean(), nullable=True),
    sa.Column('purpose', sa.String(), nullable=True),
    sa.Column('document_type', sa.Integer(), nullable=True),
    sa.Column('total', sa.Numeric(precision=10, scale=2), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('watchmen_schedule',
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('shift', sa.Enum('MORNING_V1', 'EVENING_V1', 'MORNING', 'MIDDAY', 'EVENING', 'NIGHT', name='shift'), nullable=False),
    sa.Column('watchman', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('date', 'shift')
    )
    op.create_index(op.f('ix_watchmen_schedule_watchman'), 'watchmen_schedule', ['watchman'], unique=False)
    op.create_table('zadarma_calls',
    sa.Column('call_id', sa.String(), nullable=False),
    sa.Column('call_type', sa.Enum('incoming', 'outcoming', name='calltype'), nullable=True),
    sa.Column('internal_number', sa.String(), nullable=True),
    sa.Column('caller_number', sa.String(), nullable=True),
    sa.Column('destination_number', sa.String(), nullable=True),
    sa.Column('disposition', sa.Enum('answered', 'no_answer', 'busy', 'call_failed', name='disposition'), nullable=True),
    sa.Column('ts', sa.Integer(), nullable=True),
    sa.Column('wait_seconds', sa.Integer(), nullable=True),
    sa.Column('seconds', sa.Integer(), nullable=True),
    sa.Column('watchman', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('call_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('zadarma_calls')
    op.drop_index(op.f('ix_watchmen_schedule_watchman'), table_name='watchmen_schedule')
    op.drop_table('watchmen_schedule')
    op.drop_table('tochka_records')
    op.drop_table('ofd_documents')
    op.drop_table('importers_state')
    op.drop_index(op.f('ix_importers_log_name'), table_name='importers_log')
    op.drop_table('importers_log')
    op.drop_table('events')
    op.drop_table('cm_orders')
    # ### end Alembic commands ###
