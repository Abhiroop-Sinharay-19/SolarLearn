import { useState } from 'react'

function EventPanel() {
  const [counter, setCounter] = useState(0)

  return (
    <div className="event-panel">
      <span className="event-label">Counter:</span>
      <span className="event-value">{counter}</span>
      <button type="button" onClick={() => setCounter((value) => value + 1)}>
        Increase
      </button>
      <button type="button" onClick={() => setCounter(0)}>
        Reset
      </button>
    </div>
  )
}

export default EventPanel
