"""gitlab tables

Revision ID: 4d1a4699a977
Revises: 8e3c7d1bc8b7
Create Date: 2018-03-20 18:20:07.696459+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d1a4699a977'
down_revision = '8e3c7d1bc8b7'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('gitlab_issue_notes',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(), nullable=True),
    sa.Column('created_ts', sa.INTEGER(), nullable=True),
    sa.Column('updated_ts', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('gitlab_issues',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('username', sa.VARCHAR(), nullable=True),
    sa.Column('created_ts', sa.INTEGER(), nullable=True),
    sa.Column('updated_ts', sa.INTEGER(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('gitlab_issues')
    op.drop_table('gitlab_issue_notes')
