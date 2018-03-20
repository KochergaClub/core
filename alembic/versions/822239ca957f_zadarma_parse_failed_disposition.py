"""zadarma parse_failed disposition

Revision ID: 822239ca957f
Revises: 4d1a4699a977
Create Date: 2018-03-20 20:09:13.152170+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '822239ca957f'
down_revision = '4d1a4699a977'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('zadarma_calls') as batch_op:
        batch_op.create_check_constraint(
            'disposition',
            sa.sql.column('disposition').in_(['answered', 'no_answer', 'busy', 'call_failed', 'parse_failed'])
        )


def downgrade():
    pass
