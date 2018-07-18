"""new-event-images

Revision ID: 087ee8c230f5
Revises: 334f0392216e
Create Date: 2018-07-18 20:58:57.147935+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '087ee8c230f5'
down_revision = '334f0392216e'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('events', sa.Column('image', sa.String(length=32), nullable=True))
    op.add_column('events', sa.Column('vk_image', sa.String(length=32), nullable=True))


def downgrade():
    op.drop_column('events', 'vk_image')
    op.drop_column('events', 'image')
