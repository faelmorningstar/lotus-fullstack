
from fastapi import FastAPI

app = FastAPI(
    title="Lotus API",
    description="API para gerenciamento de atividades.",
    version="0.1.0",
)


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "application": "Lotus API",
    }
