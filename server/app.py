from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource, reqparse
from models import db, User
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)


migrate = Migrate(app, db)
CORS(app)

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///viber.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key_here'

db.init_app(app)
migrate =migrate = Migrate(app, db)

# API
api = Api(app)

# User Registration
class UserRegistration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, help='Username is required', required=True)
        parser.add_argument('password', type=str, help='Password is required', required=True)
        parser.add_argument('interests', type=str, help='Interests are required', required=True)
        args = parser.parse_args()

        existing_user = User.query.filter_by(username=args['username']).first()
        if existing_user:
            return jsonify({"message": "Username already exists"}), 400

        new_user = User(username=args['username'], interests=args['interests'])
        new_user.set_password(args['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201

# User Login
class UserLogin(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', type=str, help='Username is required', required=True)
        parser.add_argument('password', type=str, help='Password is required', required=True)
        args = parser.parse_args()

        user = User.query.filter_by(username=args['username']).first()
        if not user or not user.check_password(args['password']):
            return jsonify({"message": "Invalid credentials"}), 401

        # Here, you might create and manage a session or JWT for user authentication

        return jsonify({"message": "Login successful", "user_id": user.id}), 200

# User Logout
class UserLogout(Resource):
    def post(self):
        # Clear the JWT token cookie by setting it to an empty value and expiring it
        resp = make_response(jsonify({"message": "User logged out successfully"}), 200)
        resp.set_cookie('jwt_token', '', expires=0)
        return resp
        

# Profile and messaging endpoints (to be extended further)

class UserProfile(Resource):
    def get(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            popularity = get_popularity(user.vibes_received)
            profile_data = {
                "username": user.username,
                "vibes_received": user.vibes_received,
                "popularity": popularity,
                "age": user.age,
                "gender": user.gender,
                "location": user.location
                # Other profile data...
            }
            return jsonify(profile_data)
        return jsonify({"message": "User not found"}), 404


def get_popularity(vibes_received):
    if vibes_received <= 10:
        return "Quite popular... Autographs? 😄"
    elif 11 <= vibes_received <= 50:
        return "Almost there. Soon we'll be influencing 😉"
    elif 51 <= vibes_received <= 100:
        return "We are there. Vibes pon di vibes 💃"
    else:
        return "Superstar! 🌟"  

# Add resources to API
api.add_resource(UserRegistration, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogout, '/logout')
api.add_resource(UserProfile, '/profile/<string:user_id>')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
