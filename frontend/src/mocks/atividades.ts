
export type Atividade = {
  id: number
  titulo: string
  descricao: string | null
  data_atividade: string | null
  status: string
  criado_em: string
}

export const atividadesMock: Atividade[] = [
  {
    id: 1,
    titulo: 'Estudar FastAPI',
    descricao: 'Revisar os endpoints do Lotus',
    data_atividade: '2026-11-22',
    status: 'concluida',
    criado_em: '2026-11-22T09:00:00',
  },
  {
    id: 2,
    titulo: 'Desenvolver interface React',
    descricao: 'Criar componentes reutilizáveis',
    data_atividade: '2026-11-24',
    status: 'em_andamento',
    criado_em: '2026-11-22T10:00:00',
  },
  {
    id: 3,
    titulo: 'Implementar autenticação',
    descricao: 'Planejar login e proteção de rotas',
    data_atividade: null,
    status: 'pendente',
    criado_em: '2026-11-22T11:00:00',
  },
]
