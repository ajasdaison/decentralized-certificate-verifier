from flask import Blueprint, request
from models import db
from models.user import User
from services.password_hash import hash_password

register_bp = Blueprint("register", __name__)


@register_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    hashed_password = hash_password(data["password"])

    user = User(username=data["username"], password=hashed_password, role=data["role"])

    db.session.add(user)
    db.session.commit()

    return {"message": "User registered"}
