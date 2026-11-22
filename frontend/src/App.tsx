
import ApiStatus from './components/ApiStatus'
import AtividadeForm from './components/AtividadeForm'
import AtividadesList from './components/AtividadesList'
import IridescentBackground from './components/IridescentBackground'

import './App.css'
import './iridescent.css'

function App() {
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
          <AtividadeForm />
        </section>

        <section>
          <AtividadesList />
        </section>
      </main>
    </>
  )
}

export default App
