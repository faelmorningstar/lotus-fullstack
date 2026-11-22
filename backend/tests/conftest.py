
import os

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.database import Base, DATABASE_URL, get_db
from app.main import app
from app import models  # Registra os modelos


# Utiliza exclusivamente o banco de testes.
TEST_DATABASE_URL = DATABASE_URL.rsplit("/", 1)[0] + "/lotus_test"

test_engine = create_engine(
    TEST_DATABASE_URL,
    pool_pre_ping=True,
)


@pytest.fixture
def client():
    # Proteção contra uso acidental do banco principal.
    assert test_engine.url.database == "lotus_test"

    # Cria as tabelas no banco de testes.
    Base.metadata.create_all(bind=test_engine)

    # Conexão isolada para cada teste.
    connection = test_engine.connect()
    transaction = connection.begin()
    db = Session(bind=connection, join_transaction_mode="create_savepoint")

    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db

    try:
        with TestClient(app) as test_client:
            yield test_client
    finally:
        app.dependency_overrides.clear()
        db.close()
        transaction.rollback()
        connection.close()
