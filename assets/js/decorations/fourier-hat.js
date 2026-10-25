import { createHatFourier } from './fourier-hat-model.js'

/* Separate Fourier epicycles project x(t) and y(t) onto the hat's outline. */
const TAU = 2 * Math.PI
const WIDTH = 360
const HEIGHT = 336
const SCALE = 23
const CENTER = [235, 253]
const X_ORIGIN = [CENTER[0], 89]
const Y_ORIGIN = [78, CENTER[1]]
const SAMPLES = 768
const HOLD_PHASE = 0.85
const FADE_PHASE = 0.7

function line(context, points, color, width = 1, alpha = 1) {
  context.beginPath()
  points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y))
  context.strokeStyle = color
  context.lineWidth = width
  context.globalAlpha = alpha
  context.stroke()
  context.globalAlpha = 1
}

function point(context, [x, y], color, background, radius = 3) {
  context.beginPath()
  context.arc(x, y, radius, 0, TAU)
  context.fillStyle = color
  context.fill()
  context.strokeStyle = background
  context.lineWidth = 1.2
  context.stroke()
}

function epicycles(context, terms, phase, origin, orientation, color) {
  let [x, y] = origin
  for (const term of terms) {
    const radius = term.amplitude * SCALE
    if (radius >= 0.6) {
      context.beginPath()
      context.arc(x, y, radius, 0, TAU)
      context.strokeStyle = color
      context.lineWidth = 0.8
      context.globalAlpha = 0.3
      context.stroke()
      context.globalAlpha = 1
    }
    const angle = term.frequency * phase + term.phase + orientation
    const next = [x + radius * Math.cos(angle), y + radius * Math.sin(angle)]
    line(context, [[x, y], next], color, 0.9, 0.7)
    x = next[0]; y = next[1]
  }
  return [x, y]
}

export function createFourierHat() {
  const model = createHatFourier()
  const project = ([x, y]) => [CENTER[0] + x * SCALE, CENTER[1] - y * SCALE]
  const outline = [...model.vertices, model.vertices[0]].map(project)
  const curve = Array.from({ length: SAMPLES + 1 }, (_, index) => project(model.sample(index / SAMPLES * TAU)))
  return {
    width: WIDTH,
    height: HEIGHT,

    cacheBackground(context, colors) {
      context.lineCap = 'round'
      context.lineJoin = 'round'
      line(context, [[151, X_ORIGIN[1]], [321, X_ORIGIN[1]]], colors.real, 0.7, 0.18)
      line(context, [[Y_ORIGIN[0], CENTER[1] - 75], [Y_ORIGIN[0], CENTER[1] + 76]], colors.imaginary, 0.7, 0.18)
      line(context, [[158, CENTER[1]], [326, CENTER[1]]], colors.ink, 0.65, 0.16)
      line(context, [[CENTER[0], CENTER[1] - 70], [CENTER[0], CENTER[1] + 68]], colors.ink, 0.65, 0.16)
      context.font = 'italic 15px "STIX Two Text", Georgia, serif'
      context.textAlign = 'center'
      context.fillStyle = colors.real
      context.fillText('x(t)', X_ORIGIN[0], X_ORIGIN[1] - 67)
      context.fillStyle = colors.imaginary
      context.fillText('y(t)', 36, CENTER[1] - 81)
      context.fillStyle = colors.ink
      context.font = 'italic 12px "STIX Two Text", Georgia, serif'
      context.fillText('x', 334, CENTER[1] + 4)
      context.fillText('y', CENTER[0], CENTER[1] - 77)
      context.textAlign = 'left'
    },

    render(context, rotation, colors, reducedMotion = false) {
      const cycle = (rotation * 0.5) % (TAU + HOLD_PHASE + FADE_PHASE)
      const phase = reducedMotion ? TAU : Math.min(TAU, cycle)
      const fade = reducedMotion ? 0 : Math.max(0, (cycle - TAU - HOLD_PHASE) / FADE_PHASE)
      const opacity = 1 - fade * fade * (3 - 2 * fade)
      context.save()
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.setLineDash([2, 3])
      line(context, outline, colors.accent, 0.9, 0.3 * opacity * Math.min(1, phase / 0.35))
      context.setLineDash([])
      const xEnd = epicycles(context, model.series[0], phase, X_ORIGIN, 0, colors.real)
      const yEnd = epicycles(context, model.series[1], phase, Y_ORIGIN, -Math.PI / 2, colors.imaginary)
      const current = project(model.sample(phase))
      context.setLineDash([3, 3])
      line(context, [xEnd, current], colors.real, 0.9, 0.65 * opacity)
      line(context, [yEnd, current], colors.imaginary, 0.9, 0.65 * opacity)
      context.setLineDash([])
      const count = Math.floor(phase / TAU * SAMPLES)
      line(context, [...curve.slice(0, count + 1), current], colors.accent, 2, opacity)
      point(context, X_ORIGIN, colors.real, colors.background, 1.7)
      point(context, Y_ORIGIN, colors.imaginary, colors.background, 1.7)
      point(context, xEnd, colors.real, colors.background)
      point(context, yEnd, colors.imaginary, colors.background)
      context.globalAlpha = opacity
      point(context, current, colors.accent, colors.background, 3.8)
      context.globalAlpha = 1
      context.restore()
    },
  }
}
