"""event_prototype not nullable texts

Revision ID: 2e5819792a00
Revises: 76693acfd122
Create Date: 2018-07-03 04:48:59.295224+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '2e5819792a00'
down_revision = '76693acfd122'
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column('event_prototypes', 'description',
               existing_type=mysql.TEXT(),
               nullable=False)
    op.alter_column('event_prototypes', 'summary',
               existing_type=mysql.TEXT(),
               nullable=False)


def downgrade():
    op.alter_column('event_prototypes', 'summary',
               existing_type=mysql.TEXT(),
               nullable=True)
    op.alter_column('event_prototypes', 'description',
               existing_type=mysql.TEXT(),
               nullable=True)
