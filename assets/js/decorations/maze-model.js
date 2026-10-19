import { GRID_SIZE } from './astar-model.js'

// Record recursive-backtracking maze construction, including its return steps.
// Rooms live at odd coordinates; joining corridors form a connected tree.
export function generateMaze(seed = 91, size = GRID_SIZE) {
  if (size < 5 || size % 2 === 0) throw Error('Maze size must be odd and at least 5')
  let state = seed >>> 0
  const random = () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0
    return state / 4294967296
  }
  const walls = new Uint8Array(size * size).fill(1)
  const start = size + 1
  const stack = [start]
  const events = [{ kind: 'start', to: start }]
  walls[start] = 0
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
      events.push({ kind: 'carve', from, through, to })
    } else {
      stack.pop()
      if (stack.length) {
        const to = stack[stack.length - 1]
        events.push({ kind: 'backtrack', from, through: (from + to) / 2, to })
      } else events.push({ kind: 'finish', from })
    }
  }
  return { size, walls, start, events }
}
