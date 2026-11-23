export type StatusAtividade = 'pendente' | 'em_andamento' | 'concluida';

export type Atividade = {
  id: number;
  titulo: string;
  descricao: string | null;
  data_atividade: string | null;
  status: StatusAtividade;
  criado_em: string;
};

export type NovaAtividade = {
  titulo: string;
  descricao: string | null;
  data_atividade: string | null;
};
