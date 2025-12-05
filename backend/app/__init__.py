from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config')

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, resources={r"/*": {"origins": "*"}})

    # Import models to ensure they are registered with SQLAlchemy
    # This must happen after db.init_app(app) to prevent circular import issues
    from . import models

    # Import and register blueprints (routes)
    # This pattern prevents circular imports by deferring import until app is initialized
    # Assumes 'routes.py' defines a Blueprint object named 'bp'
    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    return app