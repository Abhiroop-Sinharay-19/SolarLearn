import { useState } from 'react'

function FeedbackForm({ onSubmitFeedback }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name.trim() || !message.trim()) {
      return
    }

    onSubmitFeedback({
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    })

    setName('')
    setMessage('')
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <label>
        Your Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your name"
        />
      </label>
      <label>
        Feedback
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Share your feedback"
        />
      </label>
      <button type="submit">Send Feedback</button>
    </form>
  )
}

export default FeedbackForm
