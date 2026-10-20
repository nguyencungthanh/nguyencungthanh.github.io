import { readNumber, calculateGPA, calculatePoints } from 'js/grade-model.mjs'

const courses = []
const tasks = []
const gpaForm = document.getElementById('gpa-form')
const taskForm = document.getElementById('task-form')
const gradeSelect = document.getElementById('letterGrade')

function cell(row, text) {
  const element = document.createElement('td')
  if (text !== undefined) element.textContent = text
  row.appendChild(element)
  return element
}

function removeButton(row, label, remove) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'btn-delete'
  button.textContent = '❌'
  button.setAttribute('aria-label', label)
  button.addEventListener('click', remove)
  cell(row).appendChild(button)
}

function updateGPA() {
  document.getElementById('totalGPA').textContent = calculateGPA(courses).toFixed(2)
}

function renderCourses() {
  const body = document.querySelector('#courseTable tbody')
  body.replaceChildren()
  courses.forEach((course, index) => {
    const row = document.createElement('tr')
    cell(row, course.name)
    cell(row, course.credits)
    const select = gradeSelect.cloneNode(true)
    select.removeAttribute('id')
    select.setAttribute('aria-label', `Grade for ${course.name}`)
    select.value = String(course.points.toFixed(1))
    cell(row).appendChild(select)
    const points = cell(row, course.points.toFixed(1))
    select.addEventListener('change', () => {
      course.points = Number(select.value)
      points.textContent = course.points.toFixed(1)
      updateGPA()
    })
    removeButton(row, `Remove ${course.name}`, () => {
      courses.splice(index, 1)
      renderCourses()
      updateGPA()
    })
    body.appendChild(row)
  })
}

gpaForm.addEventListener('submit', event => {
  event.preventDefault()
  const name = document.getElementById('courseName').value.trim()
  const credits = readNumber(document.getElementById('courseCredits').value)
  if (!name || credits === null) {
    alert('Please enter a course name and valid non-negative credits.')
    return
  }
  courses.push({ name, credits, points: Number(gradeSelect.value) })
  gpaForm.reset()
  renderCourses()
  updateGPA()
})

function updatePoints() {
  const total = tasks.reduce((sum, task) => sum + calculatePoints(task), 0)
  document.getElementById('totalTaskPoints').textContent = total.toFixed(2)
}

function renderTasks() {
  const body = document.querySelector('#taskTable tbody')
  body.replaceChildren()
  tasks.forEach((task, index) => {
    const row = document.createElement('tr')
    cell(row, task.name)
    const score = document.createElement('input')
    score.type = 'number'
    score.min = '0'
    score.step = 'any'
    score.value = task.score
    score.style.width = '70px'
    score.setAttribute('aria-label', `Score for ${task.name}`)
    cell(row).appendChild(score)
    cell(row, task.max)
    cell(row, `${task.weight}%`)
    const points = cell(row, calculatePoints(task).toFixed(2))
    score.addEventListener('change', () => {
      const value = readNumber(score.value)
      if (value === null) {
        alert('Please enter a valid non-negative score.')
        score.value = task.score
        return
      }
      task.score = value
      points.textContent = calculatePoints(task).toFixed(2)
      updatePoints()
    })
    removeButton(row, `Remove ${task.name}`, () => {
      tasks.splice(index, 1)
      renderTasks()
      updatePoints()
    })
    body.appendChild(row)
  })
}

taskForm.addEventListener('submit', event => {
  event.preventDefault()
  const name = document.getElementById('taskName').value.trim()
  const score = readNumber(document.getElementById('taskScore').value)
  const max = readNumber(document.getElementById('taskMax').value, { min: Number.MIN_VALUE })
  const weight = readNumber(document.getElementById('taskWeight').value, { max: 100 })
  if (!name || score === null || max === null || weight === null) {
    alert('Enter a task name, non-negative score, positive maximum, and weight from 0 to 100%.')
    return
  }
  tasks.push({ name, score, max, weight })
  taskForm.reset()
  renderTasks()
  updatePoints()
})
