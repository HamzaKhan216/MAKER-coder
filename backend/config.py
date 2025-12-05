import os

class Config:
    # Get the base directory of the application
    basedir = os.path.abspath(os.path.dirname(__file__))

    # Database configuration
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
                              'sqlite:///' + os.path.join(basedir, 'site.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Example of a secret key (should be loaded from environment variables in production)
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
