// No-JS/reduced-motion illustration of the actual entrance-to-exit solution.
import { writeFileSync } from 'node:fs'
import { BOARD_SIZE, CELL_SIZE } from '../assets/js/decorations/astar-model.js'
import { generateMaze, solveMaze, MAZE_COLORS as DEFAULT_COLORS } from '../assets/js/decorations/maze-model.js'
import { boardSvgColors } from '../assets/js/decorations/board-palette.js'
const COLORS = boardSvgColors(DEFAULT_COLORS, 'maze')
const maze = generateMaze()
const result = solveMaze(maze)
const center = index => [(index % maze.size + .5) * CELL_SIZE, (Math.floor(index / maze.size) + .5) * CELL_SIZE]
const route = result.path.map((index, i) => `${i ? 'L' : 'M'}${center(index).join(' ')}`).join('')
const gates = [[maze.start, maze.start + 1, COLORS.start], [maze.goal, maze.goal - 1, COLORS.goal]].map(([gate, room, color]) => {
  const [x, y] = center(room)
  return `<rect x="${gate % maze.size * CELL_SIZE}" y="${Math.floor(gate / maze.size) * CELL_SIZE}" width="10" height="10" fill="${color}"/><circle cx="${x}" cy="${y}" r="8.5" fill="${COLORS.floor}" stroke="${color}" stroke-width="2"/><path d="M${x - 2.5} ${y - 3}L${x + 2.5} ${y}L${x - 2.5} ${y + 3}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
}).join('')
let walls = ''
maze.walls.forEach((wall, i) => {
  if (wall) walls += `M${i % maze.size * CELL_SIZE + .45} ${Math.floor(i / maze.size) * CELL_SIZE + .45}h9.1v9.1h-9.1z`
})
writeFileSync('layouts/_partials/decorations/maze-fallback.html', `<svg class="maze-fallback" viewBox="0 0 ${BOARD_SIZE} ${BOARD_SIZE}" width="${BOARD_SIZE}" height="${BOARD_SIZE}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
<defs><pattern id="maze-generation-grid" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${COLORS.grid}"/><rect x=".45" y=".45" width="9.1" height="9.1" fill="${COLORS.floor}"/></pattern></defs>
<rect width="${BOARD_SIZE}" height="${BOARD_SIZE}" fill="url(#maze-generation-grid)"/><path d="${walls}" fill="${COLORS.wall}"/>
<path d="${route}" fill="none" stroke="${COLORS.path}" stroke-width="6.7" stroke-linecap="round" stroke-linejoin="round"/>${gates}</svg>\n`)
console.log(`Maze escape: ${result.events.length} DFS steps; ${result.path.length} cells from entrance to exit`)
