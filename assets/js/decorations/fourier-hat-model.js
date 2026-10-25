/* The 13-sided hat from Smith, Myers, Kaplan and Goodman-Strauss (2023). */
/* Geometry reference: https://github.com/isohedral/hatviz/blob/main/geometry.js */
const HALF_ROOT_THREE = Math.sqrt(3) / 2
const TAU = 2 * Math.PI
export const HAT_VERTICES = [
  [0, 0], [-1.5, -HALF_ROOT_THREE], [-1, -2 * HALF_ROOT_THREE],
  [1, -2 * HALF_ROOT_THREE], [1.5, -HALF_ROOT_THREE], [3, -2 * HALF_ROOT_THREE],
  [4.5, -HALF_ROOT_THREE], [4, 0], [3, 0], [3, 2 * HALF_ROOT_THREE],
  [1.5, 3 * HALF_ROOT_THREE], [1, 2 * HALF_ROOT_THREE], [0, 2 * HALF_ROOT_THREE],
]
export const HARMONICS = 32

export function createHatFourier(harmonics = HARMONICS) {
  const lengths = HAT_VERTICES.map((point, index) => {
    const next = HAT_VERTICES[(index + 1) % HAT_VERTICES.length]
    return Math.hypot(next[0] - point[0], next[1] - point[1])
  })
  const perimeter = lengths.reduce((sum, length) => sum + length, 0)
  let elapsed = 0
  const edges = HAT_VERTICES.map((point, index) => {
    const next = HAT_VERTICES[(index + 1) % HAT_VERTICES.length]
    const duration = lengths[index] / perimeter
    const edge = { start: elapsed, duration, point, next, slope: point.map((value, axis) => (next[axis] - value) / duration) }
    elapsed += duration
    return edge
  })
  const mean = [0, 1].map(axis => edges.reduce((sum, edge) => sum + edge.duration * (edge.point[axis] + edge.next[axis]) / 2, 0))
  const vertices = HAT_VERTICES.map(point => point.map((value, axis) => value - mean[axis]))

  // Integrate each piecewise-linear coordinate exactly: c_n = -sum(delta slope * exp(-2*pi*i*n*t)) / (2*pi*n)^2.
  const series = [0, 1].map(axis => Array.from({ length: harmonics }, (_, index) => {
    const frequency = index + 1, omega = TAU * frequency
    let real = 0, imaginary = 0
    edges.forEach((edge, edgeIndex) => {
      const previous = edges[(edgeIndex + edges.length - 1) % edges.length]
      const jump = edge.slope[axis] - previous.slope[axis]
      real -= jump * Math.cos(omega * edge.start) / omega ** 2
      imaginary += jump * Math.sin(omega * edge.start) / omega ** 2
    })
    return { frequency, cosine: 2 * real, sine: -2 * imaginary, amplitude: 2 * Math.hypot(real, imaginary), phase: Math.atan2(imaginary, real) }
  }))
  const sample = phase => series.map(terms => terms.reduce((sum, term) => sum + term.cosine * Math.cos(term.frequency * phase) + term.sine * Math.sin(term.frequency * phase), 0))
  function boundary(phase) {
    const time = ((phase / TAU) % 1 + 1) % 1
    const edge = edges.find(edge => time < edge.start + edge.duration) || edges[edges.length - 1]
    const fraction = (time - edge.start) / edge.duration
    return edge.point.map((value, axis) => value + fraction * (edge.next[axis] - value) - mean[axis])
  }
  return { vertices, series, sample, boundary, perimeter }
}
