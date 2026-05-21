from flask_jwt_extended import create_access_token
from flask import Blueprint, request
from models.user import User
from services.password_hash import verify_password

login_bp = Blueprint("login", __name__)


@login_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(username=data["username"]).first()

    if not user:
        return {"message": "User not found"}, 404

    if not verify_password(user.password, data["password"]):
        return {"message": "Wrong password"}, 401

    access_token = create_access_token(
        identity={"username": user.username, "role": user.role}
    )

    return {
        "access_token": access_token,
        "user": {"username": user.username, "role": user.role},
    }
