
import { useEffect, useState } from 'react'

type ApiState = 'loading' | 'online' | 'offline'

type HealthResponse = {
  status: string
  application: string
}

export default function ApiStatus() {
  const [state, setState] = useState<ApiState>('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function checkApi() {
      try {
        const response = await fetch('/api/health', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data: HealthResponse = await response.json()

        if (data.status !== 'ok') {
          throw new Error('API indisponível')
        }

        if (!controller.signal.aborted) {
          setState('online')
        }
      } catch {
        if (!controller.signal.aborted) {
          setState('offline')
        }
      }
    }

    void checkApi()

    return () => controller.abort()
  }, [])

  return (
    <div role="status" aria-live="polite">
      {state === 'loading' && <p>Verificando API...</p>}
      {state === 'online' && <p>Lotus API: conectada</p>}
      {state === 'offline' && <p>Lotus API: indisponível</p>}
    </div>
  )
}
