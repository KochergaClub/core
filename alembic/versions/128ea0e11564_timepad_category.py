"""timepad-category

Revision ID: 128ea0e11564
Revises: 423ab29086b7
Create Date: 2018-04-07 18:00:12.558429+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '128ea0e11564'
down_revision = '423ab29086b7'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('events', sa.Column('timepad_category_code', sa.String(length=40), nullable=True))

def downgrade():
    op.drop_column('events', 'timepad_category_code')
