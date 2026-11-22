
import { useEffect, useState } from 'react'
import {
  atividadesMock,
  type Atividade,
} from '../mocks/atividades'

// Enquanto o PostgreSQL estiver indisponível,
// utilizaremos atividades fictícias.
const MODO_DEMONSTRACAO = true

const nomesStatus: Record<string, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
}

export default function AtividadesList() {
  const [atividades, setAtividades] = useState<Atividade[]>(
    () => MODO_DEMONSTRACAO ? atividadesMock : []
  )

  const [carregando, setCarregando] = useState(
    !MODO_DEMONSTRACAO
  )

  const [erro, setErro] = useState<string | null>(null)

  // Consulta as atividades no FastAPI.
  useEffect(() => {
    if (MODO_DEMONSTRACAO) {
      return
    }

    const controller = new AbortController()

    async function buscarAtividades() {
      try {
        const resposta = await fetch('/api/atividades', {
          signal: controller.signal,
        })

        if (!resposta.ok) {
          throw new Error(`HTTP ${resposta.status}`)
        }

        const dados: Atividade[] = await resposta.json()

        if (!controller.signal.aborted) {
          setAtividades(dados)
        }
      } catch {
        if (!controller.signal.aborted) {
          setErro('Não foi possível carregar as atividades.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setCarregando(false)
        }
      }
    }

    void buscarAtividades()

    return () => controller.abort()
  }, [])

  // Altera o status nos dados de demonstração.
  function alterarStatus(id: number, novoStatus: string) {
    if (!MODO_DEMONSTRACAO) {
      return
    }

    setAtividades((atividadesAtuais) =>
      atividadesAtuais.map((atividade) =>
        atividade.id === id
          ? { ...atividade, status: novoStatus }
          : atividade
      )
    )
  }

  // Exclui uma atividade dos dados de demonstração.
  function excluirAtividade(id: number) {
    if (!MODO_DEMONSTRACAO) {
      return
    }

    const confirmou = window.confirm(
      'Tem certeza que deseja excluir esta atividade?'
    )

    if (!confirmou) {
      return
    }

    setAtividades((atividadesAtuais) =>
      atividadesAtuais.filter(
        (atividade) => atividade.id !== id
      )
    )
  }

  if (carregando) {
    return <p>Carregando atividades...</p>
  }

  if (erro) {
    return <p role="alert">{erro}</p>
  }

  return (
    <section>
      <h2>Minhas atividades</h2>

      {MODO_DEMONSTRACAO && (
        <p role="status">
          Modo demonstração — dados fictícios
        </p>
      )}

      {atividades.length === 0 ? (
        <p>Nenhuma atividade cadastrada.</p>
      ) : (
        <ul>
          {atividades.map((atividade) => (
            <li key={atividade.id}>
              <h3>{atividade.titulo}</h3>

              <p>
                {atividade.descricao ?? 'Sem descrição'}
              </p>

              <span
                className={`atividade-status status-${atividade.status}`}
              >
                {nomesStatus[atividade.status] ?? atividade.status}
              </span>

              <div className="atividade-acoes">
                <label htmlFor={`status-${atividade.id}`}>
                  Alterar status
                </label>

                <select
                  id={`status-${atividade.id}`}
                  value={atividade.status}
                  disabled={!MODO_DEMONSTRACAO}
                  onChange={(evento) =>
                    alterarStatus(
                      atividade.id,
                      evento.target.value
                    )
                  }
                >
                  <option value="pendente">
                    Pendente
                  </option>

                  <option value="em_andamento">
                    Em andamento
                  </option>

                  <option value="concluida">
                    Concluída
                  </option>
                </select>

                <button
                  type="button"
                  className="botao-excluir"
                  disabled={!MODO_DEMONSTRACAO}
                  onClick={() =>
                    excluirAtividade(atividade.id)
                  }
                >
                  Excluir
                </button>
              </div>

              <p>
                Data: {atividade.data_atividade ?? 'Não definida'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
