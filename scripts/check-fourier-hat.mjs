/* Independent quadrature and drawing checks for the Fourier hat decoration. */
import assert from 'node:assert/strict'
import { createHatFourier, HAT_VERTICES, HARMONICS } from '../assets/js/decorations/fourier-hat-model.js'
import { createFourierHat } from '../assets/js/decorations/fourier-hat.js'

const TAU = 2 * Math.PI
const model = createHatFourier()
assert.equal(HAT_VERTICES.length, 13)
const area = HAT_VERTICES.reduce((sum, [x, y], index) => {
  const next = HAT_VERTICES[(index + 1) % HAT_VERTICES.length]
  return sum + (x * next[1] - y * next[0]) / 2
}, 0)
assert.ok(Math.abs(area - 8 * Math.sqrt(3)) < 1e-12)
assert.equal(model.series.length, 2)
model.series.forEach(terms => assert.equal(terms.length, HARMONICS))

const sampleCount = 16384
const samples = Array.from({ length: sampleCount }, (_, index) => {
  const phase = (index + 0.5) / sampleCount * TAU
  return { phase, exact: model.boundary(phase) }
})
let maxError = 0
for (const { phase, exact } of samples) {
  const reconstructed = model.sample(phase)
  maxError = Math.max(maxError, Math.hypot(...exact.map((value, axis) => value - reconstructed[axis])))
}
assert.ok(maxError < 0.045)
for (let axis = 0; axis < 2; axis++) {
  const mean = samples.reduce((sum, { exact }) => sum + exact[axis] / sampleCount, 0)
  assert.ok(Math.abs(mean) < 1e-6)
  for (const term of model.series[axis]) {
    let cosine = 0, sine = 0
    for (const { phase, exact } of samples) {
      cosine += 2 * exact[axis] * Math.cos(term.frequency * phase) / sampleCount
      sine += 2 * exact[axis] * Math.sin(term.frequency * phase) / sampleCount
    }
    assert.ok(Math.abs(cosine - term.cosine) < 1e-6)
    assert.ok(Math.abs(sine - term.sine) < 1e-6)
  }
}
assert.ok(Math.hypot(...model.sample(0).map((value, axis) => value - model.sample(TAU)[axis])) < 1e-12)

const palette = { real: '#b87828', imaginary: '#168b83', accent: '#6e66b3', ink: '#555', background: '#f4f6fb' }
const scene = createFourierHat()
function frame(rotation, reduced = false) {
  const lines = [], saved = []
  let points = [], dash = []
  const context = {
    globalAlpha: 1,
    beginPath() { points = [] },
    moveTo(x, y) { points.push([x, y]) },
    lineTo(x, y) { points.push([x, y]) },
    arc(x, y, radius) {
      assert.ok(x - radius >= 0 && y - radius >= 0 && x + radius <= scene.width && y + radius <= scene.height, 'Epicycles must stay inside the canvas')
    },
    stroke() {
      points.forEach(point => point.forEach(value => assert.ok(Number.isFinite(value))))
      if (points.length) lines.push({ points, color: this.strokeStyle, width: this.lineWidth, alpha: this.globalAlpha, dash: dash.slice() })
    },
    fill() {},
    setLineDash(value) { dash = value },
    save() { saved.push({ ...this, dash }) },
    restore() { const state = saved.pop(); dash = state.dash; delete state.dash; Object.assign(this, state) },
  }
  scene.render(context, rotation, palette, reduced)
  const xGuide = lines.find(line => line.color === palette.real && line.dash.length)
  const yGuide = lines.find(line => line.color === palette.imaginary && line.dash.length)
  assert.ok(Math.abs(xGuide.points[0][0] - xGuide.points[1][0]) < 1e-10, 'The x projection must be vertical')
  assert.ok(Math.abs(yGuide.points[0][1] - yGuide.points[1][1]) < 1e-10, 'The y projection must be horizontal')
  assert.deepEqual(xGuide.points[1], yGuide.points[1], 'Projections must meet at the pen')
  return {
    trace: lines.find(line => line.color === palette.accent && line.width === 2),
    reference: lines.find(line => line.color === palette.accent && line.dash.length),
    xGuide, yGuide,
  }
}

for (let index = 0; index <= 240; index++) frame(index / 240 * (TAU + 0.85 + 0.7) * 2)
const completeFrame = frame(TAU * 2)
const completed = completeFrame.trace
assert.ok(completed.points.length > 700)
assert.equal(completed.alpha, 1)
assert.deepEqual(completed, frame((TAU + 0.4) * 2).trace, 'The completed drawing must hold')
assert.deepEqual(completed, frame(1, true).trace, 'Reduced motion must show the complete outline')
const fading = frame((TAU + 0.85 + 0.35) * 2)
assert.deepEqual(fading.trace.points, completed.points, 'The outline must stay complete while fading')
assert.ok(Math.abs(fading.trace.alpha - 0.5) < 1e-10)
for (const layer of ['reference', 'xGuide', 'yGuide']) {
  assert.ok(Math.abs(fading[layer].alpha / completeFrame[layer].alpha - 0.5) < 1e-10, 'Guides must fade with the outline')
}
assert.ok(frame((TAU + 0.85 + 0.7 - 1e-4) * 2).trace.alpha < 1e-6, 'The outline must fade away before resetting')
const restarted = frame((TAU + 0.85 + 0.7) * 2)
assert.equal(restarted.trace.points.length, 2, 'The next cycle must start a new trace')
assert.equal(restarted.reference.alpha, 0, 'The reference outline must reappear gradually')
console.log(`Fourier hat checks passed: geometry, analytic coefficients, closed outline, x/y projections, canvas bounds, smooth fade, hold/reset and reduced motion. Maximum coordinate error: ${maxError.toFixed(4)}.`)
