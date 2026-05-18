from flask import Blueprint, request
from models import db
from models.certificate import Certificate
from services.hashing_service import generate_file_hash

issue_bp = Blueprint("issue", __name__)


@issue_bp.route("/issue", methods=["POST"])
def issue_certificate():
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
