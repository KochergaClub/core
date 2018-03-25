"""cashier-id

Revision ID: c61d808372a8
Revises: 9b2de9755848
Create Date: 2018-03-25 18:10:40.971298+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c61d808372a8'
down_revision = '9b2de9755848'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('cashier', naming_convention={'pk': 'pk_%(table_name)s'}) as batch_op:
        batch_op.drop_constraint('pk_cashier', type_='primary')
        batch_op.add_column(
            sa.Column('id', sa.Integer(), primary_key=True)
        )
        batch_op.create_unique_constraint(
            'cashier_shift_pair',
            ['date', 'shift']
        )


def downgrade():
    raise Exception('impossible')
