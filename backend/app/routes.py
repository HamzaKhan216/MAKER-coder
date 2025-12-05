from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models import Todo

api_bp = Blueprint('api', __name__, url_prefix='/api')