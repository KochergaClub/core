"""prototype-iamges

Revision ID: 772fb03e40b0
Revises: 781c9461699c
Create Date: 2018-07-18 22:55:04.369214+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '772fb03e40b0'
down_revision = '781c9461699c'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('event_prototypes', sa.Column('image', sa.String(length=32), nullable=True))


def downgrade():
    op.drop_column('event_prototypes', 'image')
