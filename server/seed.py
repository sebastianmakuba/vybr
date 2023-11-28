from models import db, User

def seed_data(app):
    with app.app_context():
        db.create_all()

        # Seed initial data - example users
        user1 = User(id='1', username='user1')
        user1.set_password('password1')

        user2 = User(id='2', username='user2')
        user2.set_password('password2')

        db.session.add(user1)
        db.session.add(user2)

        db.session.commit()
