import { GRID_SIZE, COLORS as ASTAR_COLORS } from './astar-model.js'

// Shared by the animated canvas and its static SVG fallback.
export const MAZE_COLORS = {
  grid: ASTAR_COLORS.grid, wall: ASTAR_COLORS.wall, floor: ASTAR_COLORS.floor,
  visited: '#50d5b7', frontier: '#f4bc54', active: '#fff4cc',
  start: ASTAR_COLORS.start, goal: ASTAR_COLORS.goal,
  path: ASTAR_COLORS.path, head: ASTAR_COLORS.head
}

// Build a perfect maze once, then open a gate at each end of the board.
export function generateMaze(seed = 91, size = GRID_SIZE) {
  if (size < 5 || size % 2 === 0) throw Error('Maze size must be odd and at least 5')
  let state = seed >>> 0
  const random = () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0
    return state / 4294967296
  }
  const walls = new Uint8Array(size * size).fill(1)
  const stack = [size + 1]
  const start = size, goal = (size - 2) * size + size - 1
  walls[stack[0]] = 0
  while (stack.length) {
    const from = stack[stack.length - 1]
    const x = from % size, y = Math.floor(from / size)
    const options = []
    for (const [dx, dy] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) {
      const nx = x + dx, ny = y + dy
      if (nx > 0 && nx < size - 1 && ny > 0 && ny < size - 1 && walls[ny * size + nx]) options.push(ny * size + nx)
    }
    if (options.length) {
      const to = options[Math.floor(random() * options.length)]
      const through = (from + to) / 2
      walls[through] = walls[to] = 0
      stack.push(to)
    } else {
      stack.pop()
    }
  }
  walls[start] = walls[goal] = 0
  return { size, walls, start, goal }
}

// Replay an actual depth-first search from the entrance; stop at the exit.
export function solveMaze({ size, walls, start, goal }) {
  if (walls[start] || walls[goal]) return { events: [], path: [] }
  const seen = new Uint8Array(walls.length)
  const stack = [start]
  const events = [{ kind: 'start', to: start }]
  seen[start] = 1
  while (stack.length) {
    const from = stack[stack.length - 1]
    if (from === goal) return { events, path: stack.slice() }
    const x = from % size, y = Math.floor(from / size)
    let to = -1
    for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
      const nx = x + dx, ny = y + dy
      if (nx < 0 || nx >= size || ny < 0 || ny >= size) continue
      const next = ny * size + nx
      if (!walls[next] && !seen[next]) { to = next; break }
    }
    if (to !== -1) {
      seen[to] = 1; stack.push(to)
      events.push({ kind: 'visit', from, to })
    } else {
      stack.pop()
      if (stack.length) events.push({ kind: 'backtrack', from, to: stack[stack.length - 1] })
    }
  }
  return { events, path: [] }
}
