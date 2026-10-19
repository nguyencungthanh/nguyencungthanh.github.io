// No-JavaScript fallback, generated from the same geometry as the live canvas.
import { writeFileSync } from 'node:fs'
import { project, points, mesh, axes, separator, boundary } from '../assets/js/decorations/kernel-trick-geometry.js'
const path = vertices => vertices.map((p, i) => `${i ? 'L' : 'M'}${project(...p, 1).map(v => v.toFixed(2)).join(',')}`).join('')
const output = ['<svg class="kernel-trick-fallback" viewBox="0 0 300 260" width="300" height="260" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">']
for (const curve of mesh) output.push(`<path class="lift-mesh" d="${path(curve)}"/>`)
output.push(`<path class="lift-separator" d="${path(separator)}Z"/>`)
output.push(`<path class="lift-boundary" d="${path(boundary.map(([x, y]) => [x, y, 0]))}Z"/>`)
for (const axis of axes) output.push(`<path class="lift-axis" d="${path(axis)}"/>`)
for (const point of points) {
  const [x, y] = project(point.x, point.y, point.z, 1)
  output.push(`<circle class="svm-class-${point.label === 1 ? 'positive' : 'negative'}" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="3.5"/>`)
}
output.push('</svg>')
writeFileSync('layouts/_partials/decorations/kernel-trick-fallback.html', output.join('\n') + '\n')
