/* Classical Lorenz system, integrated once with RK4 and projected onto x/z. */
const STEP = 0.008
const COUNT = 3600
const derivative = ([x, y, z]) => [10 * (y - x), x * (28 - z) - y, x * y - 8 / 3 * z]
const add = (a, b, scale) => a.map((value, index) => value + b[index] * scale)
function integrate(state) {
  const k1 = derivative(state)
  const k2 = derivative(add(state, k1, STEP / 2))
  const k3 = derivative(add(state, k2, STEP / 2))
  const k4 = derivative(add(state, k3, STEP))
  return state.map((value, axis) => value + STEP / 6 * (k1[axis] + 2 * k2[axis] + 2 * k3[axis] + k4[axis]))
}
const project = state => [150 + state[0] * 6, 220 - state[2] * 4.3]

export function createLorenzAttractor() {
  let state = [0.1, 0, 0]
  const points = []
  for (let index = 0; index < COUNT + 800; index++) {
    state = integrate(state)
    if (index >= 800) points.push(project(state))
  }
  const trail = points.slice(-100)
  let previousRotation = null
  let pendingSteps = 0
  function path(context, start, end) {
    context.beginPath()
    for (let index = start; index <= end; index++) {
      const [x, y] = points[index]
      if (index === start) context.moveTo(x, y)
      else context.lineTo(x, y)
    }
  }
  return {
    width: 300,
    height: 230,
    cacheBackground(context, colors) {
      path(context, 0, points.length - 1)
      context.strokeStyle = colors.accent
      context.lineWidth = 0.55
      context.globalAlpha = 0.23
      context.stroke()
      context.globalAlpha = 1
    },
    render(context, rotation, colors) {
      // Continue forward along the actual ODE, keeping only a bounded tail.
      if (previousRotation !== null) pendingSteps += Math.min(Math.max(rotation - previousRotation, 0), 0.1) * 180
      previousRotation = rotation
      while (pendingSteps >= 1) {
        state = integrate(state)
        trail.push(project(state))
        trail.shift()
        pendingSteps--
      }
      context.beginPath()
      trail.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y))
      context.strokeStyle = colors.imaginary
      context.lineWidth = 1.3
      context.stroke()
      const [x, y] = trail[trail.length - 1]
      context.beginPath()
      context.arc(x, y, 2.6, 0, Math.PI * 2)
      context.fillStyle = colors.real
      context.fill()
    },
  }
}
