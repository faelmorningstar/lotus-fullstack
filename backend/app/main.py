from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Atividade
from app.schemas import AtividadeCreate, AtividadeResponse, AtividadeUpdate


DatabaseSession = Annotated[Session, Depends(get_db)]



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



@app.post(
    "/atividades",
    response_model=AtividadeResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Atividades"],
)
def criar_atividade(dados: AtividadeCreate, db: DatabaseSession):
    atividade = Atividade(**dados.model_dump())

    db.add(atividade)
    db.commit()
    db.refresh(atividade)

    return atividade


@app.get(
    "/atividades",
    response_model=list[AtividadeResponse],
    tags=["Atividades"],
)
def listar_atividades(db: DatabaseSession):
    return db.query(Atividade).order_by(Atividade.id).all()


@app.patch(
    "/atividades/{atividade_id}",
    response_model=AtividadeResponse,
    tags=["Atividades"],
)
def atualizar_atividade(
    atividade_id: int,
    dados: AtividadeUpdate,
    db: DatabaseSession,
):
    atividade = db.get(Atividade, atividade_id)

    if atividade is None:
        raise HTTPException(
            status_code=404,
            detail="Atividade não encontrada",
        )

    atualizacoes = dados.model_dump(exclude_unset=True)

    for campo, valor in atualizacoes.items():
        setattr(atividade, campo, valor)

    db.commit()
    db.refresh(atividade)

    return atividade


@app.delete(
    "/atividades/{atividade_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Atividades"],
)
def excluir_atividade(atividade_id: int, db: DatabaseSession):
    atividade = db.get(Atividade, atividade_id)

    if atividade is None:
        raise HTTPException(
            status_code=404,
            detail="Atividade não encontrada",
        )

    db.delete(atividade)
    db.commit()
