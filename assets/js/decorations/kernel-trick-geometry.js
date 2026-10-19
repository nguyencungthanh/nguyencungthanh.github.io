export const WIDTH = 300
export const HEIGHT = 260
export const PERIOD = 24
export const BOUNDARY_HEIGHT = .42
const TAU = 2 * Math.PI
export const points = []
for (const [count, radius, label] of [[18, .34, 1], [30, .88, -1]]) {
  for (let i = 0; i < count; i++) {
    const angle = TAU * i / count
    const r = radius + .035 * Math.sin(i * 2.37)
    const x = r * Math.cos(angle)
    const y = r * Math.sin(angle)
    points.push({ x, y, z: x * x + y * y, label })
  }
}
export function smoothstep(t) {
  const x = Math.max(0, Math.min(1, t))
  return Math.max(0, Math.min(1, x * x * x * (10 + x * (-15 + 6 * x))))
}
// Lift → separate → trace the intersection → project it to 2D → fade → repeat.
// Every moving/fading stage uses the same C²-continuous easing at its joins.
export function stageAt(seconds) {
  const phase = ((seconds % PERIOD) + PERIOD) % PERIOD
  const lift = phase < 2 ? 0
    : phase < 6 ? smoothstep((phase - 2) / 4)
    : phase < 15 ? 1
    : phase < 19 ? 1 - smoothstep((phase - 15) / 4) : 0
  return {
    lift,
    planeOpacity: smoothstep((phase - 5) / 2) * (1 - smoothstep((phase - 13) / 2)),
    boundaryReveal: smoothstep((phase - 8) / 2),
    boundaryOpacity: smoothstep((phase - 8) / 2) * (1 - smoothstep((phase - 21) / 2)),
    projection: smoothstep((phase - 10) / 3)
  }
}
export function liftAt(seconds) {
  return stageAt(seconds).lift
}
// Blend a top-down view into an oblique view while lifting z = x₁² + x₂².
// The camera, mesh, samples, axes, and separator all use this same projection.
export function project(x, y, z, lift) {
  return [150 + (92 - 22 * lift) * x + 42 * lift * y,
    137 + 42 * lift + 27 * lift * x - (92 - 68 * lift) * y - 85 * z * lift]
}
export const axes = [
  [[-1.1, -1.1, 0], [1.2, -1.1, 0]],
  [[-1.1, -1.1, 0], [-1.1, 1.2, 0]],
  [[-1.1, -1.1, 0], [-1.1, -1.1, 1.6]]
]
export const separator = [[-.98, -.98, BOUNDARY_HEIGHT], [.98, -.98, BOUNDARY_HEIGHT], [.98, .98, BOUNDARY_HEIGHT], [-.98, .98, BOUNDARY_HEIGHT]]
// z = x₁² + x₂² intersects z = h in a circle of radius √h.
// Its projection is the nonlinear decision boundary in the original 2D plane.
export const boundary = Array.from({ length: 97 }, (_, i) => {
  const angle = TAU * i / 96
  const radius = Math.sqrt(BOUNDARY_HEIGHT)
  return [radius * Math.cos(angle), radius * Math.sin(angle), BOUNDARY_HEIGHT]
})
export const mesh = []
for (let r = .2; r <= 1.01; r += .2) {
  mesh.push(Array.from({ length: 65 }, (_, i) => {
    const angle = TAU * i / 64
    return [r * Math.cos(angle), r * Math.sin(angle), r * r]
  }))
}
for (let i = 0; i < 12; i++) {
  const angle = TAU * i / 12
  mesh.push(Array.from({ length: 17 }, (_, j) => {
    const r = j / 16
    return [r * Math.cos(angle), r * Math.sin(angle), r * r]
  }))
}
