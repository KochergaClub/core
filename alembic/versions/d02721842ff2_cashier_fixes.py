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
    op.alter_column('cashier', 'cash_income',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               type_=sa.Integer(),
               existing_nullable=True)
    op.alter_column('cashier', 'current_cash',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               type_=sa.Integer(),
               existing_nullable=True)
    op.alter_column('cashier', 'date',
               existing_type=sa.DATE(),
               type_=sa.String(length=40),
               existing_nullable=True)
    op.alter_column('cashier', 'discrepancy',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               type_=sa.Integer(),
               existing_nullable=True)
    op.alter_column('cashier', 'electronic_income',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               type_=sa.Integer(),
               existing_nullable=True)
    op.alter_column('cashier', 'id',
               existing_type=mysql.BIGINT(display_width=20),
               type_=sa.Integer(),
               autoincrement=True)
    op.alter_column('cashier', 'shift',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               type_=sa.String(length=40),
               existing_nullable=True)
    op.alter_column('cashier', 'spendings',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               type_=sa.Integer(),
               existing_nullable=True)
    op.alter_column('cashier', 'total_income',
               existing_type=mysql.BIGINT(display_width=20),
               type_=sa.Integer(),
               existing_nullable=True)
    op.alter_column('cashier', 'watchman',
               existing_type=mysql.TEXT(collation='utf8_unicode_ci'),
               type_=sa.String(length=100),
               existing_nullable=True)
    op.create_unique_constraint('cashier_shift_pair', 'cashier', ['date', 'shift'])


def downgrade():
    op.drop_constraint('cashier_shift_pair', 'cashier', type_='unique')
    op.alter_column('cashier', 'watchman',
               existing_type=sa.String(length=100),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
               existing_nullable=True)
    op.alter_column('cashier', 'total_income',
               existing_type=sa.Integer(),
               type_=mysql.BIGINT(display_width=20),
               existing_nullable=True)
    op.alter_column('cashier', 'spendings',
               existing_type=sa.Integer(),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
               existing_nullable=True)
    op.alter_column('cashier', 'shift',
               existing_type=sa.String(length=40),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
               existing_nullable=True)
    op.alter_column('cashier', 'id',
               existing_type=sa.Integer(),
               type_=mysql.BIGINT(display_width=20),
               autoincrement=True)
    op.alter_column('cashier', 'electronic_income',
               existing_type=sa.Integer(),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
               existing_nullable=True)
    op.alter_column('cashier', 'discrepancy',
               existing_type=sa.Integer(),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
               existing_nullable=True)
    op.alter_column('cashier', 'date',
               existing_type=sa.String(length=40),
               type_=sa.DATE(),
               existing_nullable=True)
    op.alter_column('cashier', 'current_cash',
               existing_type=sa.Integer(),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
               existing_nullable=True)
    op.alter_column('cashier', 'cash_income',
               existing_type=sa.Integer(),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
               existing_nullable=True)
