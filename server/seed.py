from models import db, User
from app import app  

def seed_data():
    with app.app_context():
        db.create_all()

        user1 = User(
            id='1',
            username='user1',
            age=25,
            gender='Male',
            location='City A',
            interests='Coding, Gaming'
        )
        user1.set_password('password1')

        user2 = User(
            id='2',
            username='user2',
            age=30,
            gender='Female',
            location='City B',
            interests='Reading, Music'
        )
        user2.set_password('password2')

        db.session.add(user1)
        db.session.add(user2)

        db.session.commit()

if __name__ == '__main__':
    seed_data()
