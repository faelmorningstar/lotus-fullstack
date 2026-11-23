import { useState } from 'react';

import ApiStatus from './components/ApiStatus';
import AtividadeForm from './components/AtividadeForm';
import AtividadesList from './components/AtividadesList';
import IridescentBackground from './components/IridescentBackground';

import { atividadesMock } from './mocks/atividades';

import type {
  Atividade,
  NovaAtividade,
  StatusAtividade,
} from './types/atividade';

import './App.css';
import './iridescent.css';

function App() {
  const [atividades, setAtividades] = useState<Atividade[]>(() => [
    ...atividadesMock,
  ]);

  function cadastrarAtividade(dados: NovaAtividade) {
    const novaAtividade: Atividade = {
      id: Date.now(),
      titulo: dados.titulo,
      descricao: dados.descricao,
      data_atividade: dados.data_atividade,
      status: 'pendente',
      criado_em: new Date().toISOString(),
    };

    setAtividades((anteriores) => [novaAtividade, ...anteriores]);
  }

  function alterarStatus(id: number, novoStatus: StatusAtividade) {
    setAtividades((anteriores) =>
      anteriores.map((atividade) =>
        atividade.id === id ? { ...atividade, status: novoStatus } : atividade
      )
    );
  }

  function excluirAtividade(id: number) {
    const confirmou = window.confirm(
      'Tem certeza que deseja excluir esta atividade?'
    );

    if (!confirmou) return;

    setAtividades((anteriores) =>
      anteriores.filter((atividade) => atividade.id !== id)
    );
  }

  return (
    <>
      <IridescentBackground />

      <main className="lotus-app">
        <header>
          <h1>Lotus</h1>
          <p>Organize suas atividades em um só lugar.</p>
          <ApiStatus />
        </header>

        <section>
          <AtividadeForm onCadastrar={cadastrarAtividade} />
        </section>

        <section>
          <AtividadesList
            atividades={atividades}
            onAlterarStatus={alterarStatus}
            onExcluir={excluirAtividade}
          />
        </section>
      </main>
    </>
  );
}

export default App;
