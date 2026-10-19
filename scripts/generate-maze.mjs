// No-JS/reduced-motion illustration from the actual DFS generation model.
import { writeFileSync } from 'node:fs'
import { BOARD_SIZE, CELL_SIZE, COLORS } from '../assets/js/decorations/astar-model.js'
import { generateMaze } from '../assets/js/decorations/maze-model.js'
const maze = generateMaze()
let walls = ''
maze.walls.forEach((wall, i) => {
  if (wall) walls += `M${i % maze.size * CELL_SIZE + .45} ${Math.floor(i / maze.size) * CELL_SIZE + .45}h9.1v9.1h-9.1z`
})
writeFileSync('layouts/_partials/decorations/maze-fallback.html', `<svg class="maze-fallback" viewBox="0 0 ${BOARD_SIZE} ${BOARD_SIZE}" width="${BOARD_SIZE}" height="${BOARD_SIZE}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
<defs><pattern id="maze-generation-grid" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${COLORS.grid}"/><rect x=".45" y=".45" width="9.1" height="9.1" fill="${COLORS.floor}"/></pattern></defs>
<rect width="${BOARD_SIZE}" height="${BOARD_SIZE}" fill="url(#maze-generation-grid)"/><path d="${walls}" fill="${COLORS.wall}"/></svg>\n`)
console.log(`Maze generation: ${maze.events.length} DFS steps across ${maze.size}×${maze.size}`)
