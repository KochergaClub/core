"""diff

Revision ID: d02721842ff2
Revises: 79f0a74f2da4
Create Date: 2018-07-14 22:29:10.053491+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'd02721842ff2'
down_revision = '79f0a74f2da4'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("UPDATE cashier SET cash_income = NULL WHERE cash_income = ''")
    op.execute("UPDATE cashier SET electronic_income = NULL WHERE electronic_income = ''")
    op.execute("UPDATE cashier SET current_cash = NULL WHERE current_cash = ''")
    op.execute("UPDATE cashier SET discrepancy = NULL WHERE discrepancy = ''")
    op.execute("UPDATE cashier SET spendings = 0 WHERE spendings = ''")


def downgrade():
    pass
