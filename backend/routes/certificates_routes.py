from flask import Blueprint
from models.certificate import Certificate

certificates_bp = Blueprint("certificates", __name__)


@certificates_bp.route("/certificates", methods=["GET"])
def get_certificates():
    certificates = Certificate.query.all()

    result = []

    for cert in certificates:
        result.append(
            {
                "id": cert.id,
                "certificate_id": cert.certificate_id,
                "file_hash": cert.file_hash,
                "filename": cert.filename,
                "issuer": cert.issuer,
                "created_at": cert.created_at,
            }
        )

    return result
