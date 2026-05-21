from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from models.certificate import Certificate
from services.hashing_service import generate_file_hash

issue_bp = Blueprint("issue", __name__)


@issue_bp.route("/issue", methods=["POST"])
@jwt_required()
def issue_certificate():
    current_user = get_jwt_identity()

    if current_user["role"] != "issuer":
        return {"message": "Unauthorized"}, 403

    file = request.files["file"]

    file_bytes = file.read()

    file_hash = generate_file_hash(file_bytes)

    existing = Certificate.query.filter_by(file_hash=file_hash).first()

    if existing:
        return {"message": "Certificate already exists", "hash": file_hash}

    new_certificate = Certificate(filename=file.filename, file_hash=file_hash)

    db.session.add(new_certificate)
    db.session.commit()

    return {"message": "Certificate issued successfully", "hash": file_hash}
