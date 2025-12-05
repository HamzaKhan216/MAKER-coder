import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool

from alembic import context

# this is the Alembic Config object, which provides
# access to values within the .ini file in use.
config = context.config

# Interpret the config file for Python's standard logging.
# This sets up loggers accordingly.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Add the 'backend' directory to sys.path.
# This allows importing modules from 'backend', e.g., 'app' (assuming app.py is in 'backend/').
# Assuming env.py is located in 'backend/migrations/'.
backend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(backend_path)

# Flask-Migrate specific: Import the Flask application and its SQLAlchemy 'db' instance.
# Assumes 'app.py' is directly inside the 'backend' directory, containing create_app and db.
from app import create_app, db

# target_metadata should be set to the SQLAlchemy Base.metadata
target_metadata = db.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired directly with config.get_main_option(), e.g. config.get_main_option('url')
# or acquired via context.configure() (see the docstring of context.configure for more info).

def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is additionally
    passed (thus the latches here).  By skipping the Engine
    creation we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    # Import current_app here to avoid potential circular dependencies if app isn't fully set up yet.
    from flask import current_app 

    # This ensures that an application context is available when
    # migrations are run. This is important for Flask-SQLAlchemy's
    # db object to be correctly initialized.
    # If `current_app` is already available, it means an app context
    # is active (e.g., when running via `flask db migrate`).
    # Otherwise, we create a temporary app context.
    app = None
    app_context = None
    if current_app:
        app = current_app
    else:
        # Create a basic app instance to get db.engine
        # Use FLASK_CONFIG environment variable or default to 'development'
        app = create_app(config_name=os.getenv('FLASK_CONFIG') or 'development')
        # Push the context, to be popped later if we created it.
        app_context = app.app_context()
        app_context.push()

    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            render_as_batch=True, # Important for SQLite and some other databases
                                # to handle ALTER TABLE commands correctly.
            process_revision_directives=process_revision_directives,
            **config.get_section(config.config_ini_section, {}) # Pass other config options from alembic.ini
        )

        try:
            with context.begin_transaction():
                context.run_migrations()
        finally:
            if app_context: # Only pop context if we explicitly pushed it
                app_context.pop()


def process_revision_directives(context, revision, directives):
    """
    A hook to process revision directives.
    Used to prevent auto-generating empty migration files.
    """
    if config.cmd_opts.autogenerate:
        script = directives[0]
        if script.upgrade_ops.is_empty():
            directives[:] = []
            print('No changes in model detected.')


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
