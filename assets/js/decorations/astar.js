import { createMaze, solveAStar, BOARD_SIZE, CELL_SIZE, COLORS as DEFAULT_COLORS } from './astar-model.js'
import { readBoardColors } from './board-palette.js'

for (const scene of document.querySelectorAll('[data-astar]')) {
  const canvas = scene.querySelector('canvas')
  const context = canvas.getContext('2d')
  if (!context) continue
  let COLORS = readBoardColors(scene, DEFAULT_COLORS)
  const base = document.createElement('canvas'), baseContext = base.getContext('2d')
  const complete = document.createElement('canvas'), completeContext = complete.getContext('2d')
  if (!baseContext || !completeContext) continue
  // Solve each board once; playback only paints changed cells.
  const models = [29, 173, 487].map(seed => {
    const maze = createMaze(seed)
    return { ...maze, ...solveAStar(maze) }
  })
  if (models.some(model => !model.path.length)) continue
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const mobile = window.matchMedia('(max-width: 40rem)')
  const cells = new Uint8Array(models[0].walls.length)
  let modelIndex = 0, model = models[0], timer = null, phase = 'idle'
  let cursor = 0, routeCursor = 0, active = -1, fadeStep = 0
  let wasReduced = reducedMotion.matches

  const center = index => [(index % model.size + .5) * CELL_SIZE, (Math.floor(index / model.size) + .5) * CELL_SIZE]
  function cell(index, color, target = context) {
    target.fillStyle = color
    target.fillRect(index % model.size * CELL_SIZE + .45, Math.floor(index / model.size) * CELL_SIZE + .45, CELL_SIZE - .9, CELL_SIZE - .9)
  }
  function drawBase() {
    baseContext.fillStyle = COLORS.grid; baseContext.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE)
    model.walls.forEach((wall, index) => cell(index, wall ? COLORS.wall : COLORS.floor, baseContext))
  }
  function markers() {
    for (const [index, color] of [[model.start, COLORS.start], [model.goal, COLORS.goal]]) {
      const [x, y] = center(index)
      context.beginPath(); context.arc(x, y, CELL_SIZE * .39, 0, 2 * Math.PI)
      context.fillStyle = color; context.fill()
      context.strokeStyle = COLORS.floor; context.lineWidth = 1.3; context.stroke()
    }
  }
  function segment(previous, next) {
    context.beginPath()
    context.moveTo(...center(previous)); context.lineTo(...center(next))
    context.strokeStyle = COLORS.path; context.lineWidth = CELL_SIZE * .67
    context.lineCap = 'round'; context.lineJoin = 'round'; context.stroke()
    cell(next, COLORS.path)
  }
  function head(index) {
    context.beginPath(); context.arc(...center(index), CELL_SIZE * .27, 0, 2 * Math.PI)
    context.fillStyle = COLORS.head; context.fill()
  }
  function drawRoute(count) {
    for (let i = 0; i < count; i++) segment(model.path[Math.max(0, i - 1)], model.path[i])
  }
  function drawState(final = false) {
    context.globalAlpha = 1
    context.drawImage(base, 0, 0, BOARD_SIZE, BOARD_SIZE)
    if (!final) {
      cells.forEach((value, index) => { if (value) cell(index, value === 1 ? COLORS.frontier : COLORS.visited) })
    }
    drawRoute(final ? model.path.length : routeCursor)
    if (!final && active !== -1) {
      if (phase === 'route') head(active)
      else if (phase === 'search') cell(active, COLORS.active)
    }
    markers()
  }
  function snapshot() {
    completeContext.setTransform(1, 0, 0, 1, 0, 0)
    completeContext.clearRect(0, 0, complete.width, complete.height)
    completeContext.drawImage(canvas, 0, 0)
  }
  function reset(next = false) {
    if (next) { modelIndex = (modelIndex + 1) % models.length; model = models[modelIndex] }
    cells.fill(0); cursor = 0; routeCursor = 0; active = -1; fadeStep = 0; phase = 'idle'
    drawBase()
    drawState()
  }
  function tick() {
    timer = null
    let delay = 45
    if (phase === 'idle') phase = 'search'
    else if (phase === 'search') {
      if (active !== -1) cell(active, COLORS.visited)
      const searchBatch = Math.max(1, Math.ceil(model.events.length / 150))
      for (let n = 0; n < searchBatch && cursor < model.events.length; n++) {
        const event = model.events[cursor++]
        event.opened.forEach(index => { cells[index] = 1; cell(index, COLORS.frontier) })
        cells[event.current] = 2; cell(event.current, COLORS.visited)
        active = event.current
      }
      if (cursor === model.events.length) { phase = 'route'; active = -1; delay = 400 }
      else cell(active, COLORS.active)
      markers()
    } else if (phase === 'route') {
      if (active !== -1) cell(active, COLORS.path)
      const routeBatch = Math.max(1, Math.ceil(model.path.length / 100))
      for (let n = 0; n < routeBatch && routeCursor < model.path.length; n++) {
        const next = model.path[routeCursor]
        segment(model.path[Math.max(0, routeCursor - 1)], next)
        active = next; routeCursor++
      }
      head(active); markers()
      if (routeCursor === model.path.length) { phase = 'hold'; snapshot(); delay = 2400 }
    } else if (phase === 'hold') phase = 'fade'
    else if (phase === 'fade') {
      fadeStep++
      context.globalAlpha = 1
      context.drawImage(complete, 0, 0, BOARD_SIZE, BOARD_SIZE)
      const t = Math.min(1, fadeStep / 24)
      context.globalAlpha = t * t * (3 - 2 * t)
      context.drawImage(base, 0, 0, BOARD_SIZE, BOARD_SIZE)
      context.globalAlpha = 1; markers()
      if (fadeStep >= 24) { reset(true); delay = 700 }
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
    if (reducedMotion.matches) {
      wasReduced = true; drawState(true)
    } else {
      if (wasReduced) { wasReduced = false; reset() }
      if (!document.hidden && !scene.classList.contains('is-paused')) timer = window.setTimeout(tick, phase === 'idle' ? 700 : 45)
    }
  }
  function refreshColors() {
    COLORS = readBoardColors(scene, DEFAULT_COLORS)
    drawBase()
    drawState(reducedMotion.matches)
    if (phase === 'hold' || phase === 'fade') snapshot()
  }
  resize()
  scene.classList.add('is-rendered', 'is-paused')
  new ResizeObserver(resize).observe(canvas)
  scene.addEventListener('ambient:visibility', updateActivity)
  reducedMotion.addEventListener('change', updateActivity)
  new MutationObserver(refreshColors).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
}
