
import type {
  Atividade,
  StatusAtividade,
} from '../types/atividade'

type AtividadeCardProps = {
  atividade: Atividade
  onAlterarStatus: (id: number, status: StatusAtividade) => void
  onExcluir: (id: number) => void
  acoesHabilitadas: boolean
}

const nomesStatus: Record<StatusAtividade, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Conclu\u00edda',
}

const opcoesStatus: StatusAtividade[] = [
  'pendente',
  'em_andamento',
  'concluida',
]

export default function AtividadeCard({
  atividade,
  onAlterarStatus,
  onExcluir,
  acoesHabilitadas,
}: AtividadeCardProps) {
  return (
    <li className="atividade-card">
      <h3>{atividade.titulo}</h3>

      <p>
        {atividade.descricao ?? 'Sem descri\u00e7\u00e3o'}
      </p>

      <span
        className={`atividade-status status-${atividade.status}`}
      >
        {nomesStatus[atividade.status]}
      </span>

      <div className="atividade-acoes">
        <label htmlFor={`status-${atividade.id}`}>
          Alterar status
        </label>

        <select
          id={`status-${atividade.id}`}
          value={atividade.status}
          disabled={!acoesHabilitadas}
          onChange={(evento) =>
            onAlterarStatus(
              atividade.id,
              evento.target.value as StatusAtividade
            )
          }
        >
          {opcoesStatus.map((status) => (
            <option key={status} value={status}>
              {nomesStatus[status]}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="botao-excluir"
          disabled={!acoesHabilitadas}
          onClick={() => onExcluir(atividade.id)}
        >
          Excluir
        </button>
      </div>

      <p>
        Data: {atividade.data_atividade ?? 'N\u00e3o definida'}
      </p>
    </li>
  )
}
