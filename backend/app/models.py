from app import db

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200))
    complete = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Todo {self.id}: {self.text}>'