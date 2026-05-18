from flask import Flask
from flask_cors import CORS
from models import db

# import models

# import blueprints
from routes.home_routes import home_bp
from routes.issue_routes import issue_bp
from routes.verify_routes import verify_bp
from routes.certificates_routes import certificates_bp
from routes.history_routes import history_bp
from routes.dashboard_routes import dashboard_bp


app = Flask(__name__)
CORS(app)


# sqllite url
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///certificates.db"
db.init_app(app)

# register routes
app.register_blueprint(home_bp)
app.register_blueprint(issue_bp)
app.register_blueprint(verify_bp)
app.register_blueprint(certificates_bp)
app.register_blueprint(history_bp)
app.register_blueprint(dashboard_bp)


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
