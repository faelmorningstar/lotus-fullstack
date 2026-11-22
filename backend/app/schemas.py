
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, model_validator


class AtividadeCreate(BaseModel):
    titulo: str = Field(min_length=1, max_length=150)
    descricao: str | None = None
    data_atividade: date | None = None


class AtividadeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    titulo: str
    descricao: str | None
    data_atividade: date | None
    status: str
    criado_em: datetime


class AtividadeUpdate(BaseModel):
    titulo: str | None = Field(
        default=None,
        min_length=1,
        max_length=150,
    )

    descricao: str | None = None
    data_atividade: date | None = None

    status: str | None = Field(
        default=None,
        pattern="^(pendente|em_andamento|concluida)$",
    )

    @model_validator(mode="after")
    def validar_campos_obrigatorios(self):
        campos_enviados = self.model_fields_set

        for campo in ("titulo", "status"):
            if campo in campos_enviados and getattr(self, campo) is None:
                raise ValueError(
                    f"O campo '{campo}' não pode ser nulo."
                )

        return self
