"""event-visitors-string

Revision ID: 1c6005d53882
Revises: 5be85f049d1d
Create Date: 2018-04-02 18:02:54.870268+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1c6005d53882'
down_revision = '5be85f049d1d'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('events') as batch_op:
        batch_op.drop_column('visitors')
        batch_op.add_column(sa.Column('visitors', sa.String()))


def downgrade():
    raise Exception('not supported')
