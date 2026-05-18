from flask import Blueprint, request
from models.certificate import Certificate
from models import db
from models.verification_history import VerificationHistory
from services.hashing_service import generate_file_hash

verify_bp = Blueprint("verify", __name__)


@verify_bp.route("/verify", methods=["POST"])
def verify_certificate():
    file = request.files["file"]

    file_bytes = file.read()

    file_hash = generate_file_hash(file_bytes)

    certificate = Certificate.query.filter_by(file_hash=file_hash).first()

    history = VerificationHistory(
        filename=file.filename,
        certificate_hash=file_hash,
        verified=certificate is not None,
    )

    db.session.add(history)
    db.session.commit()

    if certificate:
        return {
            "valid": True,
            "message": "Certificate Verified",
            "filename": certificate.filename,
        }

    return {"valid": False, "message": "Certificate not found"}
