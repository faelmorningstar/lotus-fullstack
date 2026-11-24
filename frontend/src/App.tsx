import { useEffect, useState } from 'react';

import ApiStatus from './components/ApiStatus';
import AtividadeForm from './components/AtividadeForm';
import AtividadesList from './components/AtividadesList';
import IridescentBackground from './components/IridescentBackground';
import { atividadesApi } from './services/atividadesApi';

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


  useEffect(() => {
    const controller = new AbortController();

    async function carregarAtividades() {
      try {
        const dados = await atividadesApi.listar();

        if (!controller.signal.aborted) {
          setAtividades(dados);
        }
      } catch (erro) {
        if (!controller.signal.aborted) {
          console.error('Erro ao carregar atividades:', erro);
        }
      }
    }

    void carregarAtividades();

    return () => controller.abort();
  }, []);


async function cadastrarAtividade(dados: NovaAtividade) {
  try {
    const novaAtividade = await atividadesApi.criar(dados);

    setAtividades((anteriores) => [
      novaAtividade,
      ...anteriores,
    ]);
  } catch (erro) {
    console.error('Erro ao cadastrar atividade:', erro);
    window.alert('Não foi possível cadastrar a atividade.');
    throw erro;
  }
}


async function alterarStatus(
  id: number,
  novoStatus: StatusAtividade
) {
  try {
    const atividadeAtualizada =
      await atividadesApi.atualizarStatus(id, novoStatus);

    setAtividades((anteriores) =>
      anteriores.map((atividade) =>
        atividade.id === id
          ? atividadeAtualizada
          : atividade
      )
    );
  } catch (erro) {
    console.error('Erro ao alterar status:', erro);
    window.alert('Não foi possível alterar o status da atividade.');
  }
}


async function excluirAtividade(id: number) {
  const confirmou = window.confirm(
    'Tem certeza que deseja excluir esta atividade?'
  );

  if (!confirmou) return;

  try {
    await atividadesApi.excluir(id);

    setAtividades((anteriores) =>
      anteriores.filter((atividade) => atividade.id !== id)
    );
  } catch (erro) {
    console.error('Erro ao excluir atividade:', erro);
    window.alert('Não foi possível excluir a atividade.');
  }
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
