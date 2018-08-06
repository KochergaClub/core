"""cashier-fixes-repeated

Revision ID: b08f094996d1
Revises: ef5ca9498578
Create Date: 2018-08-06 15:34:22.236602+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'b08f094996d1'
down_revision = 'ef5ca9498578'
branch_labels = None
depends_on = None


def upgrade():
    op.execute("UPDATE cashier SET cash_income = NULL WHERE cash_income = ''")
    op.execute("UPDATE cashier SET electronic_income = NULL WHERE electronic_income = ''")
    op.execute("UPDATE cashier SET current_cash = NULL WHERE current_cash = ''")
    op.execute("UPDATE cashier SET discrepancy = NULL WHERE discrepancy = ''")
    op.execute("UPDATE cashier SET total_income = NULL WHERE total_income = ''")
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
               type_=sa.Integer())
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
    op.execute("UPDATE cashier SET id = id + 1") # id can be zero and that's bad
    op.execute("ALTER TABLE cashier CHANGE id id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY")
    op.drop_index('ix_cashier_id', table_name='cashier')


def downgrade():
    op.create_index('ix_cashier_id', 'cashier', ['id'], unique=False)
    op.drop_constraint('cashier_shift_pair', 'cashier', type_='unique')
    op.alter_column('cashier', 'watchman',
               existing_type=sa.String(length=100),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
               existing_nullable=True)
    op.alter_column('cashier', 'total_income',
               existing_type=sa.Integer(),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
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
               type_=mysql.BIGINT(display_width=20),
               existing_nullable=True)
    op.alter_column('cashier', 'cash_income',
               existing_type=sa.Integer(),
               type_=mysql.TEXT(collation='utf8_unicode_ci'),
               existing_nullable=True)
