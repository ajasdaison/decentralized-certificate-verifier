from flask import Blueprint
from models.verification_history import VerificationHistory

history_bp = Blueprint("history", __name__)


@history_bp.route("/history", methods=["GET"])
def get_history():
    history = VerificationHistory.query.all()

    result = []

    for item in history:
        result.append(
            {
                "id": item.id,
                "filename": item.filename,
                "certificate_hash": item.certificate_hash,
                "verified": item.verified,
                "checked_at": item.checked_at,
            }
        )

    return result
