from datetime import datetime
from . import db


class VerificationHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    filename = db.Column(db.String(200))

    certificate_hash = db.Column(db.String(200))

    verified = db.Column(db.Boolean)

    checked_at = db.Column(db.DateTime, default=datetime.utcnow)
