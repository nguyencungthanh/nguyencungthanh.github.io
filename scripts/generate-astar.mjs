// Static, reduced/no-JS-friendly A* board from the same maze and solver as runtime.
import { writeFileSync } from 'node:fs'
import { createMaze, solveAStar, BOARD_SIZE, CELL_SIZE, COLORS as DEFAULT_COLORS } from '../assets/js/decorations/astar-model.js'
import { boardSvgColors } from '../assets/js/decorations/board-palette.js'
const COLORS = boardSvgColors(DEFAULT_COLORS)
const maze = createMaze(), result = solveAStar(maze)
if (!result.path.length) throw Error('Maze must have a route')
let walls = ''
maze.walls.forEach((wall, i) => {
  if (wall) walls += `M${i % maze.size * CELL_SIZE + .45} ${Math.floor(i / maze.size) * CELL_SIZE + .45}h9.1v9.1h-9.1z`
})
const center = index => `${(index % maze.size + .5) * CELL_SIZE},${(Math.floor(index / maze.size) + .5) * CELL_SIZE}`
const svg = `<svg class="astar-fallback" viewBox="0 0 ${BOARD_SIZE} ${BOARD_SIZE}" width="${BOARD_SIZE}" height="${BOARD_SIZE}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
<defs><pattern id="astar-grid" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${COLORS.grid}"/><rect x=".45" y=".45" width="9.1" height="9.1" fill="${COLORS.floor}"/></pattern></defs>
<rect width="${BOARD_SIZE}" height="${BOARD_SIZE}" fill="url(#astar-grid)"/>
<path d="${walls}" fill="${COLORS.wall}"/>
<polyline points="${result.path.map(center).join(' ')}" fill="none" stroke="${COLORS.path}" stroke-width="6.7" stroke-linecap="round" stroke-linejoin="round"/>
${[[maze.start,COLORS.start],[maze.goal,COLORS.goal]].map(([index,color])=>{const [x,y]=center(index).split(',');return `<circle cx="${x}" cy="${y}" r="3.9" fill="${color}" stroke="${COLORS.floor}" stroke-width="1.3"/>`}).join('\n')}
</svg>\n`
writeFileSync('layouts/_partials/decorations/astar-fallback.html',svg)
console.log(`A* board: ${maze.size}×${maze.size}, ${result.events.length} expanded cells, ${result.path.length} route cells`)
