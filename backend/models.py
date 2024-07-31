
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Text
# from sqlalchemy_serializer import SerializerMixin
db = SQLAlchemy()
from sqlalchemy.orm import validates

from datetime import datetime

# Models
class User(db.Model):
    # __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(120), unique=True, nullable=False)
    profile_photo = db.Column(db.String(120), nullable=True)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)

    bookings = db.relationship('Booking', backref='user', lazy='dynamic')
    reviews = db.relationship('Review', back_populates='user', cascade="all, delete-orphan")

    # @validates('email')
    # def validate_email(self, key, email):
    #     if User.query.filter_by(email=email).first():
    #         raise AssertionError('Email already exists')
    #     return email

    # @validates('phone_number')
    # def validate_phone_number(self, key, phone_number):
    #     if User.query.filter_by(phone_number=phone_number).first():
    #         raise AssertionError('Phone number already exists')
    #     return phone_number

    # def __repr__(self):
    #     return '<User %r>' % self.username

    # def serialize(self):
    #     return {
    #         'id': self.id,
    #         'username': self.username,
    #         'email': self.email,
    #         'phone_number': self.phone_number,
    #         'profile_photo': self.profile_photo,
    #         'is_admin': self.is_admin
    #     }
    
class Hotel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(512), nullable=False)
    image = db.Column(db.Text, nullable=True)
    room_count = db.Column(db.Integer)
    rooms = db.relationship('Room', backref='hotel', lazy='dynamic')

    def __repr__(self):
        return '<Hotel %r>' % self.name

class Room(db.Model):
    # __tablename__ = 'room'
    id = db.Column(db.Integer, primary_key=True)
    hotel_id = db.Column(db.Integer, db.ForeignKey('hotel.id'), nullable=False)
    room_number = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(80), nullable=False, default=False)
    image = db.Column(db.Text, nullable=True)
    
    # relationships
    bookings = db.relationship('Booking', backref='room', lazy='dynamic')
    # reviews = db.relationship('Review', backref='room', lazy='dynamic')
    # hotel = db.relationship('Hotel', back_populates='rooms')

class Booking(db.Model):
    # __tablename__ = 'booking'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'), nullable=False)
    check_in = db.Column(db.DateTime, nullable=False)
    check_out = db.Column(db.DateTime, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(80), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, default=datetime.now)


class Review(db.Model):
    # __tablename__ = 'review'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    username = db.Column(db.String(100), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='reviews')


