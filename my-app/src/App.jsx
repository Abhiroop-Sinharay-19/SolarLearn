import { useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'
import CourseCard from './components/CourseCard'
import EventPanel from './components/EventPanel'
import FeedbackForm from './components/FeedbackForm'
import { saveFeedback } from './modules/feedbackStore'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('Solar Basics')
  const [formMessage, setFormMessage] = useState('')
  const [feedbackEntries, setFeedbackEntries] = useState([])

  useEffect(() => {
    const savedName = Cookies.get('solarLearnerName')
    if (savedName) {
      setName(savedName)
    }
  }, [])

  const courses = useMemo(
    () => [
      { id: 'basics', title: 'Solar Basics', level: 'Beginner', duration: '3 weeks' },
      { id: 'design', title: 'Solar System Design', level: 'Intermediate', duration: '4 weeks' },
      { id: 'maintenance', title: 'Plant Maintenance', level: 'Advanced', duration: '2 weeks' },
    ],
    [],
  )

  const handleEnrollment = (event) => {
    event.preventDefault()

    if (!name.trim() || !email.trim()) {
      setFormMessage('Please enter both name and email.')
      return
    }

    Cookies.set('solarLearnerName', name.trim(), { expires: 30 })
    setFormMessage(`Enrollment successful for ${course}. Welcome, ${name.trim()}!`)
  }

  const handleFeedbackSubmit = (entry) => {
    saveFeedback(entry)
    setFeedbackEntries((prev) => [entry, ...prev].slice(0, 5))
  }

  return (
    <main className="app">
      <header className="hero">
        <h1>Solar Learn</h1>
        <p>React-based learning portal for solar energy training.</p>
      </header>

      <section className="section">
        <h2>Available Courses (Components)</h2>
        <div className="course-grid">
          {courses.map((item) => (
            <CourseCard key={item.id} title={item.title} level={item.level} duration={item.duration} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Events Demo</h2>
        <EventPanel />
      </section>

      <section className="section">
        <h2>Enrollment Form</h2>
        <form className="form-card" onSubmit={handleEnrollment}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
          </label>
          <label>
            Course
            <select value={course} onChange={(event) => setCourse(event.target.value)}>
              {courses.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Enroll Now</button>
          {formMessage && <p className="message">{formMessage}</p>}
        </form>
      </section>

      <section className="section">
        <h2>Feedback Form + Module</h2>
        <FeedbackForm onSubmitFeedback={handleFeedbackSubmit} />
        {feedbackEntries.length > 0 && (
          <ul className="feedback-list">
            {feedbackEntries.map((entry) => (
              <li key={entry.id}>
                <strong>{entry.name}</strong>: {entry.message}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
