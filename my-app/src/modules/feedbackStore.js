export function saveFeedback(entry) {
  const existingEntries = JSON.parse(localStorage.getItem('solarFeedbackEntries') || '[]')
  const updatedEntries = [entry, ...existingEntries].slice(0, 20)
  localStorage.setItem('solarFeedbackEntries', JSON.stringify(updatedEntries))
}
