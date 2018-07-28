"""event-prototypes-more-fields

Revision ID: ef5ca9498578
Revises: 04aaafeb8afe
Create Date: 2018-07-28 15:14:51.042264+03:00

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ef5ca9498578'
down_revision = '04aaafeb8afe'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('event_prototypes', sa.Column('timepad_category_code', sa.String(length=40), nullable=True))
    op.add_column('event_prototypes', sa.Column('timepad_prepaid_tickets', sa.Boolean(), nullable=True))
    op.add_column('event_prototypes', sa.Column('timing_description_override', sa.String(length=255), nullable=True))


def downgrade():
    op.drop_column('event_prototypes', 'timing_description_override')
    op.drop_column('event_prototypes', 'timepad_prepaid_tickets')
    op.drop_column('event_prototypes', 'timepad_category_code')
