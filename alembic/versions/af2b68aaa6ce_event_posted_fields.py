"""event-posted-fields

Revision ID: af2b68aaa6ce
Revises: 1c6005d53882
Create Date: 2018-04-02 20:56:13.683187+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'af2b68aaa6ce'
down_revision = '1c6005d53882'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('events', sa.Column('posted_fb', sa.String(), nullable=True))
    op.add_column('events', sa.Column('posted_timepad', sa.String(), nullable=True))
    op.add_column('events', sa.Column('posted_vk', sa.String(), nullable=True))


def downgrade():
    op.drop_column('events', 'posted_vk')
    op.drop_column('events', 'posted_timepad')
    op.drop_column('events', 'posted_fb')
