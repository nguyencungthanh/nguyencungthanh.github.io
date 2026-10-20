export function readNumber(value, { min = 0, max = Infinity } = {}) {
  if (String(value).trim() === '') return null
  const number = Number(value)
  return Number.isFinite(number) && number >= min && number <= max ? number : null
}

export function calculateGPA(courses) {
  const credits = courses.reduce((sum, course) => sum + course.credits, 0)
  if (!credits) return 0
  return courses.reduce((sum, course) => sum + course.points * course.credits, 0) / credits
}

export function calculatePoints(task) {
  return task.score / task.max * task.weight
}
