from app import app, db
from models import User, Hotel, Room, Booking, Review
import os

# Set up connections to both databases
local_db_url = 'sqlite:///hotel.db?mode=rw'  # or local PostgreSQL URL
render_db_url = os.environ.get('DATABASE_URL')  # set in environment

def transfer_data():
    with app.app_context():
        # Configure SQLAlchemy to use the local database
        app.config['SQLALCHEMY_DATABASE_URI'] = local_db_url
        db.session.remove()
        db.engine.dispose()

        # Read data from local database
        local_users = User.query.all()
        local_hotels = Hotel.query.all()
        local_rooms = Room.query.all()
        local_bookings = Booking.query.all()
        local_reviews = Review.query.all()

        # Switch to Render database
        app.config['SQLALCHEMY_DATABASE_URI'] = render_db_url
        db.session.remove()
        db.engine.dispose()

        # Insert data into Render database
        for user in local_users:
            new_user = User(username=user.username, email=user.email, password=user.password, phone_number=user.phone_number, profile_photo=user.profile_photo, is_admin=user.is_admin)
            db.session.add(new_user)
            db.session.commit()
        
        for hotel in local_hotels:
            new_hotel = Hotel(name=hotel.name, description=hotel.description, image=hotel.image, room_count=hotel.room_count)
            db.session.add(new_hotel)
            db.session.commit()

        for room in local_rooms:
            new_room = Room(hotel_id=room.hotel_id, room_number=room.room_number, description=room.description, price=room.price, capacity=room.capacity, status=room.status, image=room.image)
            db.session.add(new_room)
            db.session.commit()

        for booking in local_bookings:
            new_booking = Booking(user_id=booking.user_id, room_id=booking.room_id, check_in_date=booking.check_in_date, check_out_date=booking.check_out_date, total_price=booking.total_price)
            db.session.add(new_booking)
            db.session.commit()

        for review in local_reviews:
            new_review = Review(user_id=review.user_id, username=review.username, rating=review.rating, comment=review.comment)
            db.session.add(new_review)
            db.session.commit()

        

if __name__ == '__main__':
    transfer_data()