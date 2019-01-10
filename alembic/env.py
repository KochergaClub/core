from pathlib import Path
import sys
sys.path.append(str(Path(__file__).parent.parent))

from alembic import context
from sqlalchemy import engine_from_config, pool, Boolean
from sqlalchemy.dialects import mysql
from logging.config import fileConfig

from kocherga.db import DB_URL

# Import all modules with tables. TODO - think about how to improve this.
import kocherga.events.event
import kocherga.money.ofd
import kocherga.money.tochka
import kocherga.money.cashier
import kocherga.watchmen
import kocherga.gitlab
import kocherga.events.prototype
import kocherga.supplies.cookies
import kocherga.analytics.timeclub24

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
fileConfig(config.config_file_name)

target_metadata = kocherga.db.Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    context.configure(
        url=DB_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )

    with context.begin_transaction():
        context.run_migrations()

# Special code to avoid infinite tinyint -> boolean migrations.
# See https://bitbucket.org/zzzeek/alembic/issues/46/mysqltinyint-display_width-1-vs-saboolean for details.
def my_compare_type(context, inspected_column,
                    metadata_column, inspected_type, metadata_type):

    if type(inspected_type) == mysql.TINYINT and type(metadata_type) == Boolean:
        return False  # Types are identical!

    return None

def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = kocherga.db.engine()

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=my_compare_type,
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
