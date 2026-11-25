
/**
 * @vitest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AtividadeForm from './AtividadeForm';

describe('AtividadeForm', () => {
  it('envia os dados ao cadastrar uma atividade', async () => {
    const usuario = userEvent.setup();
    const onCadastrar = vi.fn().mockResolvedValue(undefined);

    render(<AtividadeForm onCadastrar={onCadastrar} />);

    await usuario.type(
      screen.getByRole('textbox', { name: 'Título' }),
      'Estudar React'
    );

    await usuario.type(
      screen.getByRole('textbox', { name: 'Descrição' }),
      'Aprender testes automatizados'
    );

    await usuario.click(
      screen.getByRole('button', { name: 'Cadastrar atividade' })
    );

    await waitFor(() => {
      expect(onCadastrar).toHaveBeenCalledWith({
        titulo: 'Estudar React',
        descricao: 'Aprender testes automatizados',
        data_atividade: null,
      });
    });
  });
});
