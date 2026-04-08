function CourseCard({ title, level, duration }) {
  return (
    <article className="course-card">
      <h3>{title}</h3>
      <p className="course-meta">Level: {level}</p>
      <p className="course-meta">Duration: {duration}</p>
    </article>
  )
}

export default CourseCard
