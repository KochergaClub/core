"""better importer logging

Revision ID: 9b2de9755848
Revises: 3d443c3ceb06
Create Date: 2018-03-21 03:21:59.458400+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import quoted_name


# revision identifiers, used by Alembic.
revision = '9b2de9755848'
down_revision = '3d443c3ceb06'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('importers_log') as batch_op:
        batch_op.add_column(sa.Column('end_ts', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('exception', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('start_ts', sa.Integer(), nullable=True))
        batch_op.drop_column('timestamp')

    with op.batch_alter_table('importers_state') as batch_op:
        batch_op.add_column(sa.Column('last_exception', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('last_ts', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('until_ts', sa.Integer(), nullable=True))
        batch_op.drop_column('timestamp')


def downgrade():
    op.add_column('importers_state', sa.Column('timestamp', sa.INTEGER(), nullable=True))
    op.drop_column('importers_state', 'until_ts')
    op.drop_column('importers_state', 'last_ts')
    op.drop_column('importers_state', 'last_exception')
    op.add_column('importers_log', sa.Column('timestamp', sa.INTEGER(), nullable=True, quote=True))
    op.drop_column('importers_log', 'start_ts')
    op.drop_column('importers_log', 'exception')
    op.drop_column('importers_log', 'end_ts')
