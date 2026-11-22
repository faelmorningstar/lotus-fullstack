
import pytest

def test_criar_atividade(client):
    dados = {
        "titulo": "Treinamento Chunin",
        "descricao": "Praticar o cadastro de atividades",
        "data_atividade": "2026-11-25",
    }

    resposta = client.post("/atividades", json=dados)

    assert resposta.status_code == 201

    atividade = resposta.json()

    assert isinstance(atividade["id"], int)
    assert atividade["titulo"] == dados["titulo"]
    assert atividade["descricao"] == dados["descricao"]
    assert atividade["data_atividade"] == dados["data_atividade"]
    assert atividade["status"] == "pendente"
    assert atividade["criado_em"] is not None


def test_listar_atividades(client):
    dados = {
        "titulo": "Treinar Ninjutsu",
        "descricao": "Praticar novas técnicas",
        "data_atividade": "2026-11-26",
    }

    # Cria uma atividade no banco de testes.
    resposta_criacao = client.post("/atividades", json=dados)

    assert resposta_criacao.status_code == 201

    # Consulta as atividades cadastradas.
    resposta = client.get("/atividades")

    assert resposta.status_code == 200

    atividades = resposta.json()

    assert len(atividades) == 1
    assert atividades[0]["titulo"] == "Treinar Ninjutsu"
    assert atividades[0]["status"] == "pendente"


def test_atualizar_atividade(client):
    # Cria uma atividade de treinamento.
    dados = {
        "titulo": "Treinar Rasengan",
        "descricao": "Praticar controle de chakra",
        "data_atividade": "2026-11-27",
    }

    criacao = client.post("/atividades", json=dados)
    assert criacao.status_code == 201

    atividade_id = criacao.json()["id"]

    # Atualiza apenas o status.
    resposta = client.patch(
        f"/atividades/{atividade_id}",
        json={"status": "concluida"},
    )

    assert resposta.status_code == 200

    atividade = resposta.json()

    assert atividade["id"] == atividade_id
    assert atividade["titulo"] == dados["titulo"]
    assert atividade["descricao"] == dados["descricao"]
    assert atividade["status"] == "concluida"


def test_excluir_atividade(client):
    # Cadastra uma atividade temporária.
    dados = {
        "titulo": "Missão temporária",
        "descricao": "Atividade para testar exclusão",
    }

    criacao = client.post("/atividades", json=dados)

    assert criacao.status_code == 201

    atividade_id = criacao.json()["id"]

    # Exclui a atividade cadastrada.
    resposta = client.delete(
        f"/atividades/{atividade_id}"
    )

    assert resposta.status_code == 204
    assert resposta.content == b""

    # Confirma que a atividade não aparece mais na lista.
    consulta = client.get("/atividades")

    assert consulta.status_code == 200
    assert all(
        atividade["id"] != atividade_id
        for atividade in consulta.json()
    )

    # Uma segunda tentativa de exclusão deve retornar 404.
    segunda_exclusao = client.delete(
        f"/atividades/{atividade_id}"
    )

    assert segunda_exclusao.status_code == 404


def test_criar_atividade_sem_titulo(client):
    dados = {
        "titulo": "",
        "descricao": "Missão com título inválido",
    }

    resposta = client.post("/atividades", json=dados)

    assert resposta.status_code == 422

    consulta = client.get("/atividades")

    assert consulta.status_code == 200
    assert consulta.json() == []


@pytest.mark.parametrize("campo", ["titulo", "status"])
def test_atualizar_atividade_com_campo_obrigatorio_nulo(
    client, campo
):
    criacao = client.post(
        "/atividades",
        json={"titulo": "Treinar com Kakashi"},
    )

    assert criacao.status_code == 201

    atividade_id = criacao.json()["id"]

    # Tenta apagar um campo obrigatório.
    resposta = client.patch(
        f"/atividades/{atividade_id}",
        json={campo: None},
    )

    assert resposta.status_code == 422

    # Confirma que os dados originais foram preservados.
    consulta = client.get("/atividades")

    assert consulta.status_code == 200

    atividade = next(
        item for item in consulta.json()
        if item["id"] == atividade_id
    )

    assert atividade["titulo"] == "Treinar com Kakashi"
    assert atividade["status"] == "pendente"
