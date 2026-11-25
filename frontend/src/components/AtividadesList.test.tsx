
/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import AtividadesList from './AtividadesList';
import type { Atividade } from '../types/atividade';

describe('AtividadesList', () => {
  const atividade: Atividade = {
    id: 1,
    titulo: 'Estudar FastAPI',
    descricao: 'Aprender integração com PostgreSQL',
    data_atividade: '2026-11-25',
    status: 'concluida',
    criado_em: '2026-11-24T12:00:00Z',
  };

  it('exibe as atividades recebidas', () => {
    render(
      <AtividadesList
        atividades={[atividade]}
        onAlterarStatus={vi.fn()}
        onExcluir={vi.fn()}
      />
    );

    expect(
      screen.getByRole('heading', { name: 'Estudar FastAPI' })
    ).toBeDefined();

    expect(
      screen.getByText('Aprender integração com PostgreSQL')
    ).toBeDefined();
  });

  it('exibe uma mensagem quando não há atividades', () => {
    render(
      <AtividadesList
        atividades={[]}
        onAlterarStatus={vi.fn()}
        onExcluir={vi.fn()}
      />
    );

    expect(
      screen.getByText('Nenhuma atividade cadastrada.')
    ).toBeDefined();
  });
});
