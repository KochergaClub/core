"""more-event-props

Revision ID: 7f8341aceb1a
Revises: c61d808372a8
Create Date: 2018-04-01 08:00:05.847603+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7f8341aceb1a'
down_revision = 'c61d808372a8'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('events', sa.Column('fb_group', sa.String(), nullable=True))
    op.add_column('events', sa.Column('has_default_image', sa.Boolean(), nullable=True))
    op.add_column('events', sa.Column('has_vk_image', sa.Boolean(), nullable=True))
    op.add_column('events', sa.Column('summary', sa.String(), nullable=True))
    op.add_column('events', sa.Column('vk_group', sa.String(), nullable=True))


def downgrade():
    op.drop_column('events', 'vk_group')
    op.drop_column('events', 'summary')
    op.drop_column('events', 'has_vk_image')
    op.drop_column('events', 'has_default_image')
    op.drop_column('events', 'fb_group')
