
# Lotus — Full Stack Task Manager

Lotus é uma aplicação web full stack para gerenciamento de atividades, desenvolvida com React, TypeScript, Python, FastAPI e PostgreSQL.

O projeto permite organizar tarefas e acompanhar seu andamento por meio de uma interface responsiva integrada a uma API REST.

## Funcionalidades

- Cadastro de atividades com título, descrição e data.
- Listagem de atividades armazenadas no PostgreSQL.
- Atualização de status: pendente, em andamento e concluída.
- Exclusão de atividades com confirmação.
- Validação de dados pela API.
- Indicadores de carregamento e tratamento de erros de conexão.
- Persistência de dados após atualizar a página.

## Tecnologias

### Frontend
- React 19
- TypeScript
- Vite
- CSS
- Vitest
- React Testing Library
- Oxlint

### Backend
- Python 3.12
- FastAPI
- SQLAlchemy
- Pydantic
- Psycopg
- Alembic
- Pytest

### Banco de dados e infraestrutura
- PostgreSQL 17
- Docker Compose
- Git e GitHub

## Arquitetura

O frontend React se comunica com a API FastAPI por meio de requisições HTTP.

A API valida as informações, executa as operações necessárias e utiliza o SQLAlchemy para acessar o PostgreSQL.

```text
React + TypeScript
       |
       | HTTP / REST
       v
     FastAPI
       |
       | SQLAlchemy + Psycopg
       v
   PostgreSQL
```

Durante o desenvolvimento, o Vite utiliza um proxy para encaminhar `/api` ao backend local.

## Estrutura do projeto

```text
lotus-fullstack/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── migrations/
│   ├── tests/
│   ├── alembic.ini
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.tsx
│   ├── package.json
│   └── vite.config.ts
├── compose.yaml
├── .env.example
└── README.md
```

## Como executar localmente

### Pré-requisitos

- Python 3.12
- Node.js e npm compatíveis com o Vite 8
- Docker Desktop com Docker Compose
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/faelmorningstar/lotus-fullstack.git
cd lotus-fullstack
```

Para utilizar a versão de desenvolvimento atualmente integrada:

```bash
git switch feat/frontend-integration
```

### 2. Configurar o ambiente

Na raiz do projeto, copie `.env.example` para `.env` e defina uma senha local para o PostgreSQL.

No PowerShell:

```powershell
Copy-Item .env.example .env
```

Edite os valores conforme necessário.

O arquivo `.env` contém configurações locais e não deve ser enviado ao GitHub.

### 3. Iniciar o PostgreSQL

Na raiz do projeto:

```bash
docker compose up -d db
```

Verifique o contêiner:

```bash
docker compose ps
```

### 4. Preparar o backend

No PowerShell:

```powershell
cd backend

python -m venv .venv
.\.venv\Scripts\Activate.ps1

python -m pip install -r requirements.txt
```

Execute as migrações do banco:

```powershell
alembic upgrade head
```

Inicie a API:

```powershell
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

A documentação interativa da API estará disponível em:

http://127.0.0.1:8000/docs

### 5. Iniciar o frontend

Em outro terminal:

```powershell
cd frontend

npm install
npm run dev
```

Abra o endereço informado pelo Vite no terminal.

## Endpoints principais

| Método | Endpoint | Funcionalidade |
|--------|----------|----------------|
| GET | /health | Verificar a API |
| GET | /atividades | Listar atividades |
| POST | /atividades | Criar atividade |
| PATCH | /atividades/{id} | Atualizar atividade |
| DELETE | /atividades/{id} | Excluir atividade |

## Testes automatizados

O projeto possui 13 testes automatizados aprovados na versão atual:

- 10 testes no backend.
- 3 testes no frontend.

### Backend

Na pasta `backend`:

```bash
python -m pytest -v
```

### Frontend

Na pasta `frontend`:

```bash
npx vitest run
```

### Verificações adicionais

Na pasta `frontend`:

```bash
npm run lint
npm run build
```

## Demonstração

A demonstração em vídeo e as capturas de tela serão adicionadas após a preparação da apresentação do projeto.

## Estado atual

O Lotus possui um MVP funcional com operações CRUD integradas ao PostgreSQL, testes automatizados e tratamento básico de erros.

Autenticação e hospedagem pública da aplicação completa não fazem parte desta versão.

## Autor

Desenvolvido por Rafael Amaral.

GitHub: https://github.com/faelmorningstar
