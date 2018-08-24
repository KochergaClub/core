"""zadarma v2

Revision ID: d3037ab49c64
Revises: d9a6ae70313f
Create Date: 2018-08-24 04:09:37.190612+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'd3037ab49c64'
down_revision = 'd9a6ae70313f'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('zadarma_calls')
    op.create_table('zadarma_calls',
        sa.Column('call_id', sa.String(length=100), nullable=False),
        sa.Column('pbx_call_id', sa.String(length=100), nullable=False),
        sa.Column('ts', sa.DateTime(), nullable=False),
        sa.Column('call_type', sa.Enum('incoming', 'outcoming', name='calltype'), nullable=True),
        sa.Column('disposition', sa.String(length=40), nullable=True),
        sa.Column('clid', sa.String(length=100), nullable=True),
        sa.Column('destination', sa.String(length=20), nullable=True),
        sa.Column('sip', sa.String(length=100), nullable=True),
        sa.Column('seconds', sa.Integer(), nullable=True),
        sa.Column('is_recorded', sa.Boolean(), nullable=True),
        sa.Column('watchman', sa.String(length=100), nullable=True),
        sa.PrimaryKeyConstraint('call_id')
    )
    op.create_index(op.f('ix_zadarma_calls_pbx_call_id'), 'zadarma_calls', ['pbx_call_id'], unique=False)


def downgrade():
    op.drop_table('zadarma_calls')
    op.create_table('zadarma_calls',
        sa.Column('call_id', sa.String(length=100), nullable=False),
        sa.Column('call_type', sa.Enum('incoming', 'outcoming', name='calltype'), nullable=True),
        sa.Column('internal_number', sa.String(length=100), nullable=True),
        sa.Column('caller_number', sa.String(length=100), nullable=True),
        sa.Column('destination_number', sa.String(length=100), nullable=True),
        sa.Column('disposition', sa.Enum('answered', 'no_answer', 'busy', 'call_failed', 'parse_failed', name='disposition'), nullable=True),
        sa.Column('ts', sa.Integer(), nullable=True),
        sa.Column('wait_seconds', sa.Integer(), nullable=True),
        sa.Column('seconds', sa.Integer(), nullable=True),
        sa.Column('watchman', sa.String(length=100), nullable=True),
        sa.PrimaryKeyConstraint('call_id')
    )
