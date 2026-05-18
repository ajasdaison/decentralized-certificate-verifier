from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import hashlib

app = Flask(__name__)
CORS(app)


# sqllite url
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///certificates.db"
db = SQLAlchemy(app)


# sqlite config
class Certificate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(200))
    file_hash = db.Column(db.String(200), unique=True)


with app.app_context():
    db.create_all()


# first page api
@app.route("/")
def home():
    return "Backend Running"


# file issue api - used by universities
@app.route("/issue", methods=["POST"])
def issue_certificate():
    file = request.files["file"]
    file_bytes = file.read()
    file_hash = hashlib.sha256(file_bytes).hexdigest()

    existing = Certificate.query.filter_by(file_hash=file_hash).first()
    if existing:
        return {"message": "Certificate already exists", "hash": file_hash}
    new_certificate = Certificate(filename=file.filename, file_hash=file_hash)
    db.session.add(new_certificate)
    db.session.commit()

    return {"message": "Certificate issued successfully", "hash": file_hash}


# verify certificate given by users
@app.route("/verify", methods=["POST"])
def verify_certificate():
    file = request.files["file"]
    file_bytes = file.read()
    file_hash = hashlib.sha256(file_bytes).hexdigest()

    certificate = Certificate.query.filter_by(file_hash=file_hash).first()

    if certificate:
        return {
            "valid": True,
            "message": "Certificate Verified",
            "filename": certificate.filename,
        }
    return {"valid": False, "message": "Certificate not found"}


if __name__ == "__main__":
    app.run(debug=True)
