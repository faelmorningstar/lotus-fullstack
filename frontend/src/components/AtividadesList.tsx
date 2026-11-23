import type { Atividade, StatusAtividade } from '../types/atividade';

import AtividadeCard from './AtividadeCard';

type AtividadesListProps = {
  atividades: Atividade[];
  onAlterarStatus: (id: number, status: StatusAtividade) => void;
  onExcluir: (id: number) => void;
};

export default function AtividadesList({
  atividades,
  onAlterarStatus,
  onExcluir,
}: AtividadesListProps) {
  return (
    <section>
      <h2>Minhas atividades</h2>

      <p role="status">Modo demonstração — dados fictícios</p>

      {atividades.length === 0 ? (
        <p>Nenhuma atividade cadastrada.</p>
      ) : (
        <ul>
          {atividades.map((atividade) => (
            <AtividadeCard
              key={atividade.id}
              atividade={atividade}
              onAlterarStatus={onAlterarStatus}
              onExcluir={onExcluir}
              acoesHabilitadas={true}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
