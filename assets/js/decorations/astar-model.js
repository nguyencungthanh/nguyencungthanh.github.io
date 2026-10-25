export const GRID_SIZE = 51
export const CELL_SIZE = 10
export const BOARD_SIZE = GRID_SIZE * CELL_SIZE

// A seeded connected maze with occasional loops and rooms.
export function createMaze(seed = 29) {
  let state = seed >>> 0
  const random = () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0
    return state / 4294967296
  }
  const walls = new Uint8Array(GRID_SIZE * GRID_SIZE).fill(1)
  const stack = [GRID_SIZE + 1]
  walls[stack[0]] = 0
  while (stack.length) {
    const current = stack[stack.length - 1]
    const x = current % GRID_SIZE, y = Math.floor(current / GRID_SIZE)
    const choices = []
    for (const [dx, dy] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) {
      const nx = x + dx, ny = y + dy
      if (nx > 0 && nx < GRID_SIZE - 1 && ny > 0 && ny < GRID_SIZE - 1 && walls[ny * GRID_SIZE + nx]) choices.push([nx, ny])
    }
    if (!choices.length) { stack.pop(); continue }
    const [nx, ny] = choices[Math.floor(random() * choices.length)]
    walls[(y + ny) / 2 * GRID_SIZE + (x + nx) / 2] = 0
    const next = ny * GRID_SIZE + nx
    walls[next] = 0
    stack.push(next)
  }
  // Open selected divider walls while preserving the outside border.
  for (let y = 1; y < GRID_SIZE - 1; y++) {
    for (let x = 1; x < GRID_SIZE - 1; x++) {
      const i = y * GRID_SIZE + x
      if (walls[i] && random() < .13) walls[i] = 0
    }
  }
  for (let room = 0; room < 9; room++) {
    const x = 3 + Math.floor(random() * (GRID_SIZE - 10))
    const y = 3 + Math.floor(random() * (GRID_SIZE - 10))
    for (let dy = 0; dy < 3; dy++) for (let dx = 0; dx < 4; dx++) walls[(y + dy) * GRID_SIZE + x + dx] = 0
  }
  const start = 7 * GRID_SIZE + 5
  const goal = 45 * GRID_SIZE + 45
  return { size: GRID_SIZE, walls, start, goal }
}

// A consistent octile heuristic for 8-neighbor A*, with no corner cutting.
export function heuristic(a, b, size) {
  const dx = Math.abs(a % size - b % size)
  const dy = Math.abs(Math.floor(a / size) - Math.floor(b / size))
  return Math.max(dx, dy) + (Math.SQRT2 - 1) * Math.min(dx, dy)
}
export function neighbors(index, walls, size) {
  const x = index % size, y = Math.floor(index / size)
  const result = []
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue
      const nx = x + dx, ny = y + dy
      if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue
      const next = ny * size + nx
      if (walls[next]) continue
      if (dx && dy && (walls[y * size + nx] || walls[ny * size + x])) continue
      result.push([next, dx && dy ? Math.SQRT2 : 1])
    }
  }
  return result
}
class MinHeap {
  constructor() { this.items = [] }
  less(a, b) { return a.f < b.f || (a.f === b.f && a.h < b.h) }
  push(entry) {
    const heap = this.items
    let i = heap.length
    heap.push(entry)
    while (i > 0) {
      const parent = (i - 1) >> 1
      if (!this.less(entry, heap[parent])) break
      heap[i] = heap[parent]; i = parent
    }
    heap[i] = entry
  }
  pop() {
    const heap = this.items, first = heap[0], last = heap.pop()
    if (heap.length) {
      let i = 0
      while (2 * i + 1 < heap.length) {
        let child = 2 * i + 1
        if (child + 1 < heap.length && this.less(heap[child + 1], heap[child])) child++
        if (!this.less(heap[child], last)) break
        heap[i] = heap[child]; i = child
      }
      heap[i] = last
    }
    return first
  }
}
export function solveAStar(maze) {
  const { size, walls, start, goal } = maze
  if (walls[start] || walls[goal]) return { path: [], events: [], cost: Infinity }
  const scores = new Float64Array(walls.length).fill(Infinity)
  const parent = new Int32Array(walls.length).fill(-1)
  const closed = new Uint8Array(walls.length)
  const heap = new MinHeap(), events = []
  scores[start] = 0
  const h = heuristic(start, goal, size)
  heap.push({ index: start, g: 0, h, f: h })
  while (heap.items.length) {
    const entry = heap.pop(), current = entry.index
    if (closed[current] || entry.g > scores[current]) continue
    closed[current] = 1
    const event = { current, opened: [] }
    events.push(event)
    if (current === goal) {
      const path = []
      for (let node = goal; node !== -1; node = parent[node]) path.push(node)
      return { path: path.reverse(), events, cost: scores[goal] }
    }
    for (const [next, cost] of neighbors(current, walls, size)) {
      if (closed[next]) continue
      const candidate = scores[current] + cost
      if (candidate >= scores[next]) continue
      if (!Number.isFinite(scores[next])) event.opened.push(next)
      scores[next] = candidate
      parent[next] = current
      const estimate = heuristic(next, goal, size)
      heap.push({ index: next, g: candidate, h: estimate, f: candidate + estimate })
    }
  }
  return { path: [], events, cost: Infinity }
}
export const COLORS = {
  floor: '#0b1119', grid: '#26313b', wall: '#68727c',
  frontier: '#1b7a9c', visited: '#133b4a', active: '#ffd36c',
  path: '#65ed43', head: '#dcffb2', start: '#63c6ff', goal: '#c49aff'
}
