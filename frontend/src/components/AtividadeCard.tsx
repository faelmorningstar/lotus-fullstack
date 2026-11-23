import type { Atividade, StatusAtividade } from '../types/atividade';

type AtividadeCardProps = {
  atividade: Atividade;
  onAlterarStatus: (id: number, status: StatusAtividade) => void
  onExcluir: (id: number) => void;
  acoesHabilitadas: boolean;
};

const nomesStatus: Record<string, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'ConcluÃ­da',
};

export default function AtividadeCard({
  atividade,
  onAlterarStatus,
  onExcluir,
  acoesHabilitadas,
}: AtividadeCardProps) {
  return (
    <li className="atividade-card">
      <h3>{atividade.titulo}</h3>

      <p>{atividade.descricao ?? 'Sem descriÃ§Ã£o'}</p>

      <span className={`atividade-status status-${atividade.status}`}>
        {nomesStatus[atividade.status] ?? atividade.status}
      </span>

      <div className="atividade-acoes">
        <label htmlFor={`status-${atividade.id}`}>Alterar status</label>

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
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluida">ConcluÃ­da</option>
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

      <p>Data: {atividade.data_atividade ?? 'NÃ£o definida'}</p>
    </li>
  );
}
