from models import db, User
from app import app  

def seed_data():
    with app.app_context():
        db.create_all()

        # Seed initial users with varying vibes received for testing
        user1 = User(id='1', username='user1', interests='Coding', vibes_received=8)
        user1.set_password('password1')

        user2 = User(id='2', username='user2', interests='Gaming', vibes_received=30)
        user2.set_password('password2')

        user3 = User(id='3', username='user3', interests='Music', vibes_received=80)
        user3.set_password('password3')

        db.session.add(user1)
        db.session.add(user2)
        db.session.add(user3)

        db.session.commit()

if __name__ == '__main__':
    seed_data()
