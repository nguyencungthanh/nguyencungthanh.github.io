import { WIDTH, HEIGHT, points, project, mesh, axes, separator, boundary, BOUNDARY_HEIGHT, stageAt } from './kernel-trick-geometry.js'

for (const scene of document.querySelectorAll('[data-kernel-trick]')) {
  const canvas = scene.querySelector('canvas')
  const context = canvas.getContext('2d')
  if (!context) continue
  const labels = Array.from(scene.querySelectorAll('[data-lift-axis]'))
  labels.forEach(label => { label.style.left = '0'; label.style.top = '0' })
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const mobile = window.matchMedia('(max-width: 40rem)')
  let frame = null
  let elapsed = 0
  let lastTick = null
  let lastPaint = -Infinity
  let scale = 1
  let cssScale = 1
  let colors
  let stage = stageAt(reducedMotion.matches ? 13 : 0)
  let lift = stage.lift

  function line(vertices, color, width, alpha, closed = false) {
    context.beginPath()
    vertices.forEach(([x, y, z], i) => {
      const [u, v] = project(x, y, z, lift)
      if (i) context.lineTo(u, v)
      else context.moveTo(u, v)
    })
    if (closed) context.closePath()
    context.strokeStyle = color
    context.lineWidth = width
    context.globalAlpha = alpha
    context.stroke()
  }

  function render() {
    context.setTransform(scale, 0, 0, scale, 0, 0)
    context.clearRect(0, 0, WIDTH, HEIGHT)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    // Projection shadows keep the correspondence with the original 2D samples.
    if (lift > .01) {
      context.setLineDash([2, 3])
      for (const point of points) {
        line([[point.x, point.y, 0], [point.x, point.y, point.z]], colors.ink, .5, .13 * lift)
      }
      context.setLineDash([])
    }
    for (const curve of mesh) line(curve, colors.ink, .6, .1 + .06 * lift)
    const planeOpacity = stage.planeOpacity
    if (planeOpacity > 0) {
      line(separator, colors.plane, .9, .5 * planeOpacity, true)
      context.fillStyle = colors.plane
      context.globalAlpha = .08 * planeOpacity
      context.fill()
    }
    // Trace the plane/paraboloid intersection, then lower that same curve.
    if (stage.boundaryOpacity > 0) {
      const height = BOUNDARY_HEIGHT * (1 - stage.projection)
      const segmentCount = (boundary.length - 1) * stage.boundaryReveal
      const count = Math.floor(segmentCount)
      const curve = boundary.slice(0, count + 1).map(([x, y]) => [x, y, height])
      if (count < boundary.length - 1) {
        const t = segmentCount - count
        const from = boundary[count], to = boundary[count + 1]
        curve.push([from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t, height])
      }
      // Dotted drop lines make the projection legible, then disappear smoothly.
      const guideOpacity = Math.sin(Math.PI * stage.projection) * .38 * stage.boundaryOpacity
      if (guideOpacity > .001) {
        context.setLineDash([2, 3])
        for (let i = 0; i < boundary.length - 1; i += 8) {
          const [x, y] = boundary[i]
          line([[x, y, height], [x, y, 0]], colors.plane, .7, guideOpacity)
        }
        context.setLineDash([])
        line(boundary.map(([x, y]) => [x, y, 0]), colors.plane, 1, guideOpacity)
      }
      line(curve, colors.plane, 2.1, stage.boundaryOpacity, stage.boundaryReveal === 1)
    }
    axes.forEach((axis, i) => line(axis, colors.ink, .8, i === 2 ? .42 * lift : .42))
    // Paint from back to front; only 48 samples and a small wireframe per frame.
    const projected = points.map(point => ({ point, at: project(point.x, point.y, point.z, lift) }))
    projected.sort((a, b) => a.at[1] - b.at[1])
    for (const { point, at: [x, y] } of projected) {
      context.beginPath()
      context.arc(x, y, 3.5, 0, 2 * Math.PI)
      context.globalAlpha = 1
      context.fillStyle = point.label === 1 ? colors.blue : colors.orange
      context.fill()
      context.strokeStyle = colors.background
      context.lineWidth = 1.1
      context.stroke()
    }
    context.globalAlpha = 1
    labels.forEach((label, i) => {
      const [x, y] = project(...axes[i][1], lift)
      label.style.transform = `translate(${(x + (i === 0 ? 7 : -5)) * cssScale}px, ${(y + (i === 0 ? 2 : -16)) * cssScale}px)`
      label.style.opacity = i === 2 ? String(lift) : '1'
    })
  }

  function resize() {
    const width = canvas.getBoundingClientRect().width
    if (!width) return
    const pixels = Math.min(600, Math.round(width * Math.min(window.devicePixelRatio || 1, mobile.matches ? 1.5 : 2)))
    canvas.width = pixels
    canvas.height = Math.round(pixels * HEIGHT / WIDTH)
    scale = pixels / WIDTH
    cssScale = width / WIDTH
    render()
  }

  function refreshColors() {
    const style = getComputedStyle(scene)
    const read = name => style.getPropertyValue(name).trim()
    colors = { ink: read('--text'), background: read('--bg'), blue: read('--cluster-0'), orange: read('--cluster-1'), plane: read('--diagram-violet') }
    render()
  }

  function tick(now) {
    frame = null
    if (lastTick !== null) elapsed += Math.min((now - lastTick) / 1000, .1)
    lastTick = now
    if (now - lastPaint >= 1000 / (mobile.matches ? 30 : 60) - .5) {
      stage = stageAt(elapsed)
      lift = stage.lift
      render()
      lastPaint = now
    }
    frame = window.requestAnimationFrame(tick)
  }

  function updateActivity() {
    const paused = reducedMotion.matches || document.hidden || scene.classList.contains('is-paused')
    if (paused) {
      if (frame !== null) window.cancelAnimationFrame(frame)
      frame = null
      lastTick = null
      if (reducedMotion.matches) { stage = stageAt(13); lift = stage.lift; render() }
    } else if (frame === null) {
      lastTick = null
      lastPaint = -Infinity
      frame = window.requestAnimationFrame(tick)
    }
  }

  refreshColors()
  resize()
  scene.classList.add('is-rendered', 'is-paused')
  new ResizeObserver(resize).observe(canvas)
  // Cache the palette until the site's theme changes, never read CSS per frame.
  new MutationObserver(refreshColors).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] })
  scene.addEventListener('ambient:visibility', updateActivity)
  reducedMotion.addEventListener('change', updateActivity)
}
