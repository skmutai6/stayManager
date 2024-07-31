"""Add username to Review model

Revision ID: aaded0b227e6
Revises: 407c0b882509
Create Date: 2024-07-27 10:33:29.331434

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'aaded0b227e6'
down_revision = '407c0b882509'
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('review', sa.Column('username', sa.String(length=100), nullable=True))
    op.execute("UPDATE review SET username = 'unknown' WHERE username IS NULL")
    op.alter_column('review', 'username', existing_type=sa.String(length=100), nullable=False)

    # Drop the room_id column and its foreign key constraint   
    op.drop_constraint('review_room_id_fkey', 'review', type_='foreignkey')
    op.drop_column('review', 'room_id')

def downgrade():
    # Add the room_id column and its foreign key constraint back
    op.add_column('review', sa.Column('room_id', sa.INTEGER(), nullable=False))
    op.create_foreign_key('review_room_id_fkey', 'review', 'room', ['room_id'], ['id'])
    
    # Drop the username column
    op.drop_column('review', 'username')
