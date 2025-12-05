from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models import Todo

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    todo_list = [
        {
            'id': todo.id,
            'title': todo.title,
            'description': todo.description,
            'completed': todo.completed
        }
        for todo in todos
    ]
    return jsonify(todo_list)