from datetime import datetime
from . import db


class Certificate(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    certificate_id = db.Column(db.String(100), unique=True)

    filename = db.Column(db.String(200))

    file_hash = db.Column(db.String(200), unique=True)

    issuer = db.Column(db.String(200))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
