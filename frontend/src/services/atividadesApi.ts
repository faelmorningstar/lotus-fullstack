
import type { Atividade, NovaAtividade } from '../types/atividade'

const API_BASE_URL = '/api';

async function requisicao<T>(
  caminho: string,
  opcoes?: RequestInit
): Promise<T> {
  const resposta = await fetch(`${API_BASE_URL}${caminho}`, opcoes);

  if (!resposta.ok) {
    throw new Error(`Falha na requisição: HTTP ${resposta.status}`);
  }

  if (resposta.status === 204) {
    return undefined as T;
  }

  return resposta.json() as Promise<T>;
}

export const atividadesApi = {
  listar() {
    return requisicao<Atividade[]>('/atividades');
  },

  criar(dados: NovaAtividade) {
    return requisicao<Atividade>('/atividades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });
  },

  atualizarStatus(id: number, status: string) {
    return requisicao<Atividade>(`/atividades/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
  },

  excluir(id: number) {
    return requisicao<void>(`/atividades/${id}`, {
      method: 'DELETE',
    });
  },
};
