"""event-images-step2

Revision ID: 781c9461699c
Revises: 087ee8c230f5
Create Date: 2018-07-18 22:15:58.740689+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '781c9461699c'
down_revision = '087ee8c230f5'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_column('events', 'has_vk_image')
    op.drop_column('events', 'has_default_image')


def downgrade():
    op.add_column('events', sa.Column('has_default_image', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True))
    op.add_column('events', sa.Column('has_vk_image', mysql.TINYINT(display_width=1), autoincrement=False, nullable=True))
