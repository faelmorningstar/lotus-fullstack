
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_returns_200():
    response = client.get("/health")
    assert response.status_code == 200


def test_health_returns_correct_data():
    response = client.get("/health")
    assert response.json() == {
        "status": "ok",
        "application": "Lotus API",
    }


def test_health_returns_json():
    response = client.get("/health")
    assert response.headers["content-type"] == "application/json"
