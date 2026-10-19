/* A flat unit-circle diagram with progressively drawn cosine and sine plots. */
const TAU = 2 * Math.PI
const WIDTH = 300
const HEIGHT = WIDTH * 16 / 9
const CENTER = [150, 113]
const RADIUS = 70
const PLOT_LEFT = 42
const PLOT_RIGHT = 251
const AMPLITUDE = 39
const REAL_BASELINE = 296
const IMAGINARY_BASELINE = 449
const PHASE_RANGE = 2 * TAU
const PHASE_OFFSET = 3 * Math.PI / 2
const SAMPLES = 160

function line(context, points, color, width = 1, alpha = 1) {
  context.beginPath()
  points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y))
  context.strokeStyle = color
  context.lineWidth = width
  context.globalAlpha = alpha
  context.stroke()
  context.globalAlpha = 1
}

function arrow(context, from, to, color) {
  line(context, [from, to], color, 0.8, 0.65)
  const angle = Math.atan2(to[1] - from[1], to[0] - from[0])
  const head = [
    [to[0] - 5 * Math.cos(angle - 0.4), to[1] - 5 * Math.sin(angle - 0.4)],
    to,
    [to[0] - 5 * Math.cos(angle + 0.4), to[1] - 5 * Math.sin(angle + 0.4)],
  ]
  line(context, head, color, 0.8, 0.65)
}

function point(context, [x, y], color, background, radius = 3.5) {
  context.beginPath()
  context.arc(x, y, radius, 0, TAU)
  context.fillStyle = color
  context.fill()
  context.strokeStyle = background
  context.lineWidth = 1.5
  context.stroke()
}

export function createPhaseTraces() {
  // Cache the fixed 2D curves. Only the visible prefix and endpoints change.
  const samples = Array.from({ length: SAMPLES + 1 }, (_, index) => ({
    x: PLOT_LEFT + index / SAMPLES * (PLOT_RIGHT - PLOT_LEFT),
    angle: index / SAMPLES * PHASE_RANGE,
  }))
  const realCurve = samples.map(({ x, angle }) => [x, REAL_BASELINE - AMPLITUDE * Math.cos(angle)])
  const imaginaryCurve = samples.map(({ x, angle }) => [x, IMAGINARY_BASELINE - AMPLITUDE * Math.sin(angle)])

  return {
    width: WIDTH,
    height: HEIGHT,

    cacheBackground(context, colors) {
      context.lineCap = 'round'
      context.lineJoin = 'round'
      const { ink, accent, real, imaginary } = colors
      arrow(context, [49, CENTER[1]], [246, CENTER[1]], ink)
      arrow(context, [CENTER[0], 208], [CENTER[0], 26], ink)
      context.beginPath()
      context.arc(...CENTER, RADIUS, 0, TAU)
      context.strokeStyle = accent
      context.lineWidth = 1
      context.globalAlpha = 0.5
      context.stroke()
      context.globalAlpha = 1

      context.fillStyle = ink
      context.font = 'italic 15px "STIX Two Text", Georgia, serif'
      context.fillText('Re', 252, 119)
      context.fillText('Im', 157, 28)
      context.fillText('z = e', 28, 25)
      context.font = 'italic 10px "STIX Two Text", Georgia, serif'
      context.fillText('iφ', 59, 17)

      for (const [baseline, color, label] of [
        [REAL_BASELINE, real, 'Re(z)'],
        [IMAGINARY_BASELINE, imaginary, 'Im(z)'],
      ]) {
        arrow(context, [26, baseline], [269, baseline], ink)
        arrow(context, [PLOT_LEFT, baseline + 52], [PLOT_LEFT, baseline - 53], ink)
        context.fillStyle = color
        context.font = 'italic 17px "STIX Two Text", Georgia, serif'
        context.fillText(label, 29, baseline - 65)
        context.fillStyle = ink
        context.font = 'italic 15px "STIX Two Text", Georgia, serif'
        context.fillText('φ', 276, baseline + 5)
        for (const sign of [-1, 1]) {
          const y = baseline + sign * AMPLITUDE
          line(context, [[PLOT_LEFT - 3, y], [PLOT_LEFT + 3, y]], ink, 0.7, 0.45)
        }
        for (const fraction of [0.5, 1]) {
          const x = PLOT_LEFT + fraction * (PLOT_RIGHT - PLOT_LEFT)
          line(context, [[x, baseline - 3], [x, baseline + 3]], ink, 0.7, 0.5)
        }
      }
    },

    render(context, rotation, colors) {
      const phase = (rotation + PHASE_OFFSET) % PHASE_RANGE
      const real = Math.cos(phase)
      const imaginary = Math.sin(phase)
      const current = [CENTER[0] + RADIUS * real, CENTER[1] - RADIUS * imaginary]
      const x = PLOT_LEFT + phase / PHASE_RANGE * (PLOT_RIGHT - PLOT_LEFT)
      const realPoint = [x, REAL_BASELINE - AMPLITUDE * real]
      const imaginaryPoint = [x, IMAGINARY_BASELINE - AMPLITUDE * imaginary]
      context.save()
      context.lineCap = 'round'
      context.lineJoin = 'round'

      // Link the same instantaneous sample across all three views.
      context.setLineDash([3, 4])
      line(context, [current, realPoint], colors.real, 0.9, 0.6)
      line(context, [current, imaginaryPoint], colors.imaginary, 0.9, 0.5)
      context.setLineDash([])

      const count = Math.floor(phase / PHASE_RANGE * SAMPLES)
      line(context, [...realCurve.slice(0, count + 1), realPoint], colors.real, 1.8)
      line(context, [...imaginaryCurve.slice(0, count + 1), imaginaryPoint], colors.imaginary, 1.8)

      line(context, [CENTER, current], colors.accent, 1.5)
      point(context, CENTER, colors.ink, colors.background, 2)
      point(context, realPoint, colors.real, colors.background)
      point(context, imaginaryPoint, colors.imaginary, colors.background)
      point(context, current, colors.accent, colors.background, 4.5)
      context.restore()
    },
  }
}
