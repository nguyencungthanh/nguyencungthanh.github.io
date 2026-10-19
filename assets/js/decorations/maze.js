import { CELL_SIZE, BOARD_SIZE } from './astar-model.js'
import { generateMaze, solveMaze, MAZE_COLORS as COLORS } from './maze-model.js'

for (const scene of document.querySelectorAll('[data-maze-generation]')) {
  const canvas = scene.querySelector('canvas')
  const context = canvas.getContext('2d')
  if (!context) continue
  const base = document.createElement('canvas'), baseContext = base.getContext('2d')
  const complete = document.createElement('canvas'), completeContext = complete.getContext('2d')
  if (!baseContext || !completeContext) continue
  const models = [91, 283, 607].map(seed => {
    const maze = generateMaze(seed)
    return { ...maze, ...solveMaze(maze) }
  })
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const mobile = window.matchMedia('(max-width: 40rem)')
  // Show the whole maze before tracing its DFS branches: 0 unvisited corridor,
  // 1 wall, 2 current branch, 3 visited corridor.
  const cells = new Uint8Array(models[0].walls)
  let modelIndex = 0, model = models[0], timer = null, phase = 'idle'
  let cursor = 0, routeCursor = 0, active = -1, fadeStep = 0
  let wasReduced = reducedMotion.matches

  const center = index => [(index % model.size + .5) * CELL_SIZE, (Math.floor(index / model.size) + .5) * CELL_SIZE]
  function cell(index, state, target = context) {
    target.fillStyle = state === 1 ? COLORS.wall : state === 2 ? COLORS.frontier : state === 3 ? COLORS.visited : COLORS.floor
    target.fillRect(index % model.size * CELL_SIZE + .45, Math.floor(index / model.size) * CELL_SIZE + .45, CELL_SIZE - .9, CELL_SIZE - .9)
  }
  function drawBase() {
    baseContext.fillStyle = COLORS.grid; baseContext.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE)
    model.walls.forEach((state, index) => cell(index, state, baseContext))
    markers(baseContext)
  }
  function markers(target = context) {
    for (const [gate, room, color] of [[model.start, model.start + 1, COLORS.start], [model.goal, model.goal - 1, COLORS.goal]]) {
      target.fillStyle = color
      target.fillRect(gate % model.size * CELL_SIZE, Math.floor(gate / model.size) * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      const [x, y] = center(room)
      target.beginPath(); target.arc(x, y, CELL_SIZE * .85, 0, 2 * Math.PI)
      target.fillStyle = COLORS.floor; target.fill()
      target.strokeStyle = color; target.lineWidth = 2; target.stroke()
      target.beginPath(); target.moveTo(x - 2.5, y - 3); target.lineTo(x + 2.5, y); target.lineTo(x - 2.5, y + 3)
      target.lineCap = 'round'; target.lineJoin = 'round'; target.stroke()
    }
  }
  function segment(previous, next) {
    context.beginPath(); context.moveTo(...center(previous)); context.lineTo(...center(next))
    context.strokeStyle = COLORS.path; context.lineWidth = CELL_SIZE * .67
    context.lineCap = 'round'; context.lineJoin = 'round'; context.stroke()
    context.fillStyle = COLORS.path
    context.fillRect(next % model.size * CELL_SIZE + .45, Math.floor(next / model.size) * CELL_SIZE + .45, CELL_SIZE - .9, CELL_SIZE - .9)
  }
  function drawRoute(count) {
    for (let i = 0; i < count; i++) segment(model.path[Math.max(0, i - 1)], model.path[i])
  }
  function head(route = false) {
    if (active < 0) return
    context.beginPath(); context.arc(...center(active), CELL_SIZE * .34, 0, 2 * Math.PI)
    context.fillStyle = route ? COLORS.head : COLORS.active; context.fill()
  }
  function drawState(final = false) {
    context.globalAlpha = 1
    context.drawImage(base, 0, 0, BOARD_SIZE, BOARD_SIZE)
    const state = final ? model.walls : cells
    state.forEach((value, index) => { if (value !== 1) cell(index, value) })
    drawRoute(final ? model.path.length : routeCursor)
    if (!final && (phase === 'search' || phase === 'route')) head(phase === 'route')
    markers()
  }
  function snapshot() {
    completeContext.setTransform(1, 0, 0, 1, 0, 0)
    completeContext.clearRect(0, 0, complete.width, complete.height)
    completeContext.drawImage(canvas, 0, 0)
  }
  function reset(next = false) {
    if (next) { modelIndex = (modelIndex + 1) % models.length; model = models[modelIndex] }
    cells.set(model.walls); cursor = 0; routeCursor = 0; active = -1; fadeStep = 0; phase = 'idle'
    drawBase()
    drawState()
  }
  function tick() {
    timer = null
    let delay = 45
    if (phase === 'idle') phase = 'search'
    else if (phase === 'search') {
      if (active >= 0) cell(active, cells[active])
      const batch = Math.ceil(model.events.length / 200)
      for (let n = 0; n < batch && cursor < model.events.length; n++) {
        const event = model.events[cursor++]
        if (event.kind === 'start' || event.kind === 'visit') {
          cells[event.to] = 2; cell(event.to, 2); active = event.to
        } else if (event.kind === 'backtrack') {
          cells[event.from] = 3; cell(event.from, 3); active = event.to
        }
      }
      if (cursor === model.events.length) { phase = 'route'; active = -1; delay = 350 }
      else head()
      markers()
    } else if (phase === 'route') {
      const batch = Math.ceil(model.path.length / 90)
      for (let n = 0; n < batch && routeCursor < model.path.length; n++) {
        const next = model.path[routeCursor]
        segment(model.path[Math.max(0, routeCursor - 1)], next)
        active = next; routeCursor++
      }
      head(true); markers()
      if (routeCursor === model.path.length) { phase = 'hold'; snapshot(); delay = 2600 }
    } else if (phase === 'hold') phase = 'fade'
    else if (phase === 'fade') {
      fadeStep++
      context.globalAlpha = 1; context.drawImage(complete, 0, 0, BOARD_SIZE, BOARD_SIZE)
      const t = Math.min(1, fadeStep / 24)
      context.globalAlpha = t * t * (3 - 2 * t)
      context.drawImage(base, 0, 0, BOARD_SIZE, BOARD_SIZE)
      context.globalAlpha = 1; markers()
      if (fadeStep >= 24) { reset(true); delay = 650 }
    }
    timer = window.setTimeout(tick, delay)
  }
  function resize() {
    const width = canvas.getBoundingClientRect().width
    if (!width) return
    const pixels = Math.min(1000, Math.round(width * Math.min(window.devicePixelRatio || 1, mobile.matches ? 1.5 : 2)))
    canvas.width = canvas.height = base.width = base.height = complete.width = complete.height = pixels
    const scale = pixels / BOARD_SIZE
    context.setTransform(scale, 0, 0, scale, 0, 0)
    baseContext.setTransform(scale, 0, 0, scale, 0, 0)
    drawBase()
    drawState(reducedMotion.matches)
    if (phase === 'hold' || phase === 'fade') snapshot()
  }
  function updateActivity() {
    window.clearTimeout(timer); timer = null
    if (reducedMotion.matches) { wasReduced = true; drawState(true) }
    else {
      if (wasReduced) { wasReduced = false; reset() }
      if (!document.hidden && !scene.classList.contains('is-paused')) timer = window.setTimeout(tick, phase === 'idle' ? 650 : 45)
    }
  }
  resize()
  scene.classList.add('is-rendered', 'is-paused')
  new ResizeObserver(resize).observe(canvas)
  scene.addEventListener('ambient:visibility', updateActivity)
  reducedMotion.addEventListener('change', updateActivity)
}
