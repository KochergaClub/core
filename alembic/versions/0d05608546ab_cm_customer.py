"""cm-customer

Revision ID: 0d05608546ab
Revises: 22e35ca41985
Create Date: 2018-04-11 03:34:37.402636+03:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d05608546ab'
down_revision = '22e35ca41985'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('cm_customers',
    sa.Column('customer_id', sa.Integer(), nullable=False),
    sa.Column('card_id', sa.Integer(), nullable=True),
    sa.Column('first_name', sa.String(length=100), nullable=True),
    sa.Column('last_name', sa.String(length=100), nullable=True),
    sa.Column('gender', sa.Enum('unknown', 'male', 'female', name='gender'), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('time_discount', sa.Integer(), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('subscription_until', sa.Date(), nullable=True),
    sa.Column('comment', sa.Text(), nullable=True),
    sa.Column('phone_number', sa.String(length=40), nullable=True),
    sa.Column('phone_number2', sa.String(length=40), nullable=True),
    sa.Column('vk_link', sa.String(length=1024), nullable=True),
    sa.Column('fb_link', sa.String(length=1024), nullable=True),
    sa.Column('twitter_link', sa.String(length=1024), nullable=True),
    sa.Column('instagram_link', sa.String(length=1024), nullable=True),
    sa.Column('skype_link', sa.String(length=1024), nullable=True),
    sa.Column('website_link', sa.String(length=1024), nullable=True),
    sa.Column('birthday', sa.Date(), nullable=True),
    sa.Column('address', sa.String(length=1024), nullable=True),
    sa.Column('ref', sa.String(length=1024), nullable=True),
    sa.Column('ref2', sa.String(length=1024), nullable=True),
    sa.Column('mailing_list', sa.Boolean(), nullable=True),
    sa.Column('goods_discount', sa.Integer(), nullable=True),
    sa.Column('activity_started', sa.DateTime(), nullable=True),
    sa.Column('activity_ended', sa.DateTime(), nullable=True),
    sa.Column('last_visit', sa.Date(), nullable=True),
    sa.Column('total_spent', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('customer_id')
    )


def downgrade():
    op.drop_table('cm_customers')
