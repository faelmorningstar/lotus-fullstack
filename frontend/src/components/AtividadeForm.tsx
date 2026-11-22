
import { useState, type FormEvent } from 'react'

export default function AtividadeForm() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [dataAtividade, setDataAtividade] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [salvando, setSalvando] = useState(false)

  async function cadastrarAtividade(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    setSalvando(true)
    setMensagem('')

    try {
      const resposta = await fetch('/api/atividades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo,
          descricao: descricao || null,
          data_atividade: dataAtividade || null,
        }),
      })

      if (!resposta.ok) {
        throw new Error(`HTTP ${resposta.status}`)
      }

      setMensagem('Atividade cadastrada com sucesso!')
      setTitulo('')
      setDescricao('')
      setDataAtividade('')
    } catch {
      setMensagem('Não foi possível cadastrar a atividade.')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <section>
      <h2>Nova atividade</h2>

      <form onSubmit={cadastrarAtividade}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(evento) => setTitulo(evento.target.value)}
            maxLength={150}
            required
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dataAtividade">Data da atividade</label>
          <input
            id="dataAtividade"
            type="date"
            value={dataAtividade}
            onChange={(evento) => setDataAtividade(evento.target.value)}
          />
        </div>

        <button type="submit" disabled={salvando}>
          {salvando ? 'Salvando...' : 'Cadastrar atividade'}
        </button>
      </form>

      {mensagem && <p role="status">{mensagem}</p>}
    </section>
  )
}
