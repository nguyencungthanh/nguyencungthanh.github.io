/* Convex wireframes: each mesh displays its own vertex/edge/face counts. */
const PHI = (1 + Math.sqrt(5)) / 2
const SIGNS = [-1, 1]
const cube = SIGNS.flatMap(x => SIGNS.flatMap(y => SIGNS.map(z => [x, y, z])))
const icosahedron = SIGNS.flatMap(a => SIGNS.flatMap(b => [[0, a, b * PHI], [a, b * PHI, 0], [b * PHI, 0, a]]))
const dodecahedron = [...cube, ...SIGNS.flatMap(a => SIGNS.flatMap(b => [[0, a / PHI, b * PHI], [a / PHI, b * PHI, 0], [b * PHI, 0, a / PHI]]))]
const prism = [-1, 1].flatMap(z => [0, 1, 2].map(i => [Math.cos(i * 2 * Math.PI / 3), Math.sin(i * 2 * Math.PI / 3), z * Math.sqrt(3) / 2]))

const definitions = [
  ['Tetrahedron', [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]], 4],
  ['Cube', cube, 6],
  ['Octahedron', [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], 8],
  ['Icosahedron', icosahedron, 20],
  ['Dodecahedron', dodecahedron, 12],
  ['Triangular prism', prism, 5],
]

export function createPolyhedra() {
  const meshes = definitions.map(([name, vertices, faces]) => {
    const pairs = []
    let minimum = Infinity
    vertices.forEach((a, i) => vertices.slice(i + 1).forEach((b, j) => {
      const distance = a.reduce((sum, value, axis) => sum + (value - b[axis]) ** 2, 0)
      minimum = Math.min(minimum, distance)
      pairs.push({ a: i, b: i + j + 1, distance })
    }))
    const radius = Math.max(...vertices.map(v => Math.hypot(...v)))
    return { name, vertices: vertices.map(v => v.map(value => value / radius)), faces, edges: pairs.filter(pair => Math.abs(pair.distance - minimum) < 1e-6) }
  })
  return {
    width: 300,
    height: 264,
    cacheBackground(context, colors) {
      context.textAlign = 'center'
      meshes.forEach((mesh, index) => {
        const x = 50 + index % 3 * 100
        const y = 105 + Math.floor(index / 3) * 132
        context.fillStyle = colors.ink
        context.font = '11px "Source Sans 3", sans-serif'
        context.fillText(mesh.name, x, y)
        context.font = '12px "STIX Two Text", Georgia, serif'
        context.fillText(`${mesh.vertices.length} − ${mesh.edges.length} + ${mesh.faces} = 2`, x, y + 17)
      })
      context.textAlign = 'left'
    },
    render(context, rotation, colors) {
      meshes.forEach((mesh, index) => {
        const yaw = rotation * 0.5 + index * 0.7
        const pitch = 0.4 + Math.sin(rotation * 0.15 + index) * 0.18
        const vertices = mesh.vertices.map(([x, y, z]) => {
          const horizontal = x * Math.cos(yaw) + z * Math.sin(yaw)
          const depth = z * Math.cos(yaw) - x * Math.sin(yaw)
          return [50 + index % 3 * 100 + horizontal * 34, 52 + Math.floor(index / 3) * 132 + (y * Math.cos(pitch) - depth * Math.sin(pitch)) * 34, y * Math.sin(pitch) + depth * Math.cos(pitch)]
        })
        mesh.edges.forEach(({ a, b }) => {
          context.beginPath()
          context.moveTo(vertices[a][0], vertices[a][1])
          context.lineTo(vertices[b][0], vertices[b][1])
          context.strokeStyle = index % 2 ? colors.imaginary : colors.accent
          context.globalAlpha = (vertices[a][2] + vertices[b][2]) / 4 + 0.55
          context.lineWidth = 1.1
          context.stroke()
        })
      })
      context.globalAlpha = 1
    },
  }
}
