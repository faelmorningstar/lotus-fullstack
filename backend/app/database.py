
import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

# Localiza o arquivo .env na raiz do projeto.
ENV_PATH = Path(__file__).resolve().parents[2] / ".env"

load_dotenv(ENV_PATH)

# Recupera as credenciais sem armazenar a senha no código.
db_name = os.environ["POSTGRES_DB"]
db_user = os.environ["POSTGRES_USER"]
db_password = os.environ["POSTGRES_PASSWORD"]

DATABASE_URL = (
    f"postgresql+psycopg://{db_user}:"
    f"{db_password}@127.0.0.1:5432/{db_name}"
)

# Cria o mecanismo de conexão com o PostgreSQL.
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Define como serão criadas as sessões do banco.
SessionLocal = sessionmaker(bind=engine)


# Classe base para nossos futuros modelos.
class Base(DeclarativeBase):
    pass


def get_db():
    with SessionLocal() as db:
        yield db
