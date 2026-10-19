import { CELL_SIZE, BOARD_SIZE, COLORS } from './astar-model.js'
import { generateMaze } from './maze-model.js'

for (const scene of document.querySelectorAll('[data-maze-generation]')) {
  const canvas = scene.querySelector('canvas')
  const context = canvas.getContext('2d')
  if (!context) continue
  const base = document.createElement('canvas'), baseContext = base.getContext('2d')
  const complete = document.createElement('canvas'), completeContext = complete.getContext('2d')
  if (!baseContext || !completeContext) continue
  const models = [91, 283, 607].map(seed => generateMaze(seed))
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const mobile = window.matchMedia('(max-width: 40rem)')
  const cells = new Uint8Array(models[0].walls.length).fill(1)
  let modelIndex = 0, model = models[0], timer = null, phase = 'idle'
  let cursor = 0, active = -1, fadeStep = 0
  let wasReduced = reducedMotion.matches

  const center = index => [(index % model.size + .5) * CELL_SIZE, (Math.floor(index / model.size) + .5) * CELL_SIZE]
  function cell(index, state, target = context) {
    target.fillStyle = state === 1 ? COLORS.wall : state === 2 ? COLORS.frontier : COLORS.floor
    target.fillRect(index % model.size * CELL_SIZE + .45, Math.floor(index / model.size) * CELL_SIZE + .45, CELL_SIZE - .9, CELL_SIZE - .9)
  }
  function head() {
    if (active < 0) return
    context.beginPath(); context.arc(...center(active), CELL_SIZE * .34, 0, 2 * Math.PI)
    context.fillStyle = COLORS.active; context.fill()
  }
  function drawState(final = false) {
    context.globalAlpha = 1
    context.drawImage(base, 0, 0, BOARD_SIZE, BOARD_SIZE)
    const state = final ? model.walls : cells
    state.forEach((value, index) => { if (value !== 1) cell(index, value) })
    if (!final && phase === 'carve') head()
  }
  function snapshot() {
    completeContext.setTransform(1, 0, 0, 1, 0, 0)
    completeContext.clearRect(0, 0, complete.width, complete.height)
    completeContext.drawImage(canvas, 0, 0)
  }
  function reset(next = false) {
    if (next) { modelIndex = (modelIndex + 1) % models.length; model = models[modelIndex] }
    cells.fill(1); cursor = 0; active = -1; fadeStep = 0; phase = 'idle'
    drawState()
  }
  function tick() {
    timer = null
    let delay = 45
    if (phase === 'idle') phase = 'carve'
    else if (phase === 'carve') {
      if (active >= 0) cell(active, cells[active])
      const batch = Math.ceil(model.events.length / 210)
      for (let n = 0; n < batch && cursor < model.events.length; n++) {
        const event = model.events[cursor++]
        if (event.kind === 'start') {
          cells[event.to] = 2; cell(event.to, 2); active = event.to
        } else if (event.kind === 'carve') {
          cells[event.through] = cells[event.to] = 2
          cell(event.through, 2); cell(event.to, 2); active = event.to
        } else if (event.kind === 'backtrack') {
          cells[event.from] = cells[event.through] = 0
          cell(event.from, 0); cell(event.through, 0); active = event.to
        } else {
          cells[event.from] = 0; cell(event.from, 0); active = -1
        }
      }
      head()
      if (cursor === model.events.length) { phase = 'hold'; snapshot(); delay = 2400 }
    } else if (phase === 'hold') phase = 'fade'
    else if (phase === 'fade') {
      fadeStep++
      context.globalAlpha = 1; context.drawImage(complete, 0, 0, BOARD_SIZE, BOARD_SIZE)
      const t = Math.min(1, fadeStep / 24)
      context.globalAlpha = t * t * (3 - 2 * t)
      context.drawImage(base, 0, 0, BOARD_SIZE, BOARD_SIZE)
      context.globalAlpha = 1
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
    baseContext.fillStyle = COLORS.grid; baseContext.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE)
    for (let i = 0; i < cells.length; i++) cell(i, 1, baseContext)
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
