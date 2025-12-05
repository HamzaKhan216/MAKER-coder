from flask import Blueprint, jsonify, request, abort
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

@api_bp.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todo = Todo.query.get(todo_id)
    if todo is None:
        abort(404) # Not Found

    db.session.delete(todo)
    db.session.commit()

    return jsonify({'message': f'Todo with id {todo_id} deleted successfully'}), 200