from flask import Blueprint
from models.certificate import Certificate
from models.verification_history import VerificationHistory

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
def dashboard_stats():
    total_certificates = Certificate.query.count()

    total_verifications = VerificationHistory.query.count()

    successful_verifications = VerificationHistory.query.filter_by(
        verified=True
    ).count()

    failed_verifications = VerificationHistory.query.filter_by(verified=False).count()

    return {
        "totalCertificates": total_certificates,
        "totalVerifications": total_verifications,
        "successfulVerifications": successful_verifications,
        "failedVerifications": failed_verifications,
    }
