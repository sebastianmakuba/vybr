from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.String, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    interests = db.Column(db.String(255))
    vibes_received = db.Column(db.Integer, default=0)
    gender = db.Column(db.String(10))
    age = db.Column(db.Integer)
    location = db.Column(db.String(100))
    # Track user-related fields...

      # Track vibes received
    # Other profile-related fields...

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
