"""new tochka api

Revision ID: 5a2f0ba57633
Revises: e2c0cdfc9bbf
Create Date: 2018-12-29 14:37:33.755924+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '5a2f0ba57633'
down_revision = 'e2c0cdfc9bbf'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column('tochka_records', 'debit')


def downgrade():
    op.add_column('tochka_records', sa.Column('debit', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True))
