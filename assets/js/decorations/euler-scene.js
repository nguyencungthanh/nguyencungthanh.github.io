import { createPhaseTraces } from './phase-traces.js'
import { createLorenzAttractor } from './lorenz-attractor.js'
import { createPolyhedra } from './polyhedra.js'

/* Euler's formula as a projected helix. Canvas 2D; no WebGL or animation library. */
(() => {
  const TAU = 2 * Math.PI
  const WIDTH = 300
  const HEIGHT = 280
  const SEGMENTS = 192
  const HALF_LENGTH = 1.65
  const MAX_PHASE = 2 * TAU
  const PERIOD_SECONDS = 15
  const scenes = []
  const activeScenes = new Set()
  const mobileViewport = window.matchMedia('(max-width: 40rem)')
  let phase = Math.PI / 4
  let rotation = phase
  let frame = null
  let previousPaint = 0

 const project = ([time, real, imaginary]) => [
  140 + 52 * time + 40 * real,
  130 - 15 * time - 60 * imaginary + 15 * real,
]
  const timeAt = angle => -HALF_LENGTH + 2 * HALF_LENGTH * angle / MAX_PHASE
  const angles = Array.from({ length: SEGMENTS + 1 }, (_, index) => index / SEGMENTS * MAX_PHASE)
  const helix = angles.map(angle => project([timeAt(angle), Math.cos(angle), Math.sin(angle)]))
  const realProjection = angles.map(angle => project([timeAt(angle), Math.cos(angle), -1.15]))
  const imaginaryProjection = angles.map(angle => project([timeAt(angle), -1.15, Math.sin(angle)]))

  function line(context, points, color, width = 1, alpha = 1) {
    context.beginPath()
    points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y))
    context.strokeStyle = color
    context.lineWidth = width
    context.globalAlpha = alpha
    context.stroke()
    context.globalAlpha = 1
  }

  function plane(context, vertices, color, alpha) {
    const points = vertices.map(project)
    context.beginPath()
    points.forEach(([x, y], index) => index ? context.lineTo(x, y) : context.moveTo(x, y))
    context.closePath()
    context.fillStyle = color
    context.globalAlpha = alpha
    context.fill()
    context.globalAlpha = 1
    line(context, [...points, points[0]], color, 0.7, 0.18)
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

  function drawTrail(context, points, endpoint, color, width) {
    const count = Math.floor(phase / MAX_PHASE * SEGMENTS)
    line(context, [...points.slice(0, count + 1), endpoint], color, width)
  }

  class EulerScene {
    constructor(element) {
      // Never render a helix for stale or unsupported scene markup.
      const type = element.dataset.eulerScene
      if (!['helix', 'traces', 'lorenz', 'polyhedra'].includes(type)) return
      this.element = element
      this.canvas = element.querySelector('canvas')
      this.context = this.canvas.getContext('2d')
      if (!this.context) return
      this.background = document.createElement('canvas')
      this.backgroundContext = this.background.getContext('2d')
      const renderers = { traces: createPhaseTraces, lorenz: createLorenzAttractor, polyhedra: createPolyhedra }
      this.renderer = renderers[type] ? renderers[type]() : null
      this.width = this.renderer ? this.renderer.width : WIDTH
      this.height = this.renderer ? this.renderer.height : HEIGHT
      this.scale = 0
      this.refreshColors()
      this.resize()
      this.observer = new ResizeObserver(() => this.resize())
      this.observer.observe(element)
      element.addEventListener('ambient:visibility', () => this.updateActivity())
    }

    refreshColors() {
      const style = getComputedStyle(this.element)
      const color = name => style.getPropertyValue(name).trim()
      this.colors = {
        accent: color('--math-accent'),
        real: color('--math-real'),
        imaginary: color('--math-imaginary'),
        ink: color('--light-text'),
        background: color('--bg'),
      }
      if (this.scale) {
        this.cacheBackground()
        this.render()
      }
    }

    resize() {
      const width = this.canvas.clientWidth || this.element.querySelector('.euler-fallback').clientWidth
      if (width <= 0) {
        this.updateActivity()
        return
      }
      // Limit backing pixels on high-DPI phones; CSS keeps the layout responsive.
      const mobile = mobileViewport.matches
      const pixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
      const pixels = Math.min(this.renderer ? 540 : 720, Math.round(width * pixelRatio))
      if (this.canvas.width !== pixels || !this.scale) {
        this.canvas.width = pixels
        this.canvas.height = Math.round(pixels * this.height / this.width)
        this.background.width = this.canvas.width
        this.background.height = this.canvas.height
        this.scale = pixels / this.width
        this.cacheBackground()
        this.render()
        this.element.classList.add('is-rendered')
      }
      this.updateActivity()
    }

    updateActivity() {
      const visible = this.element.getBoundingClientRect().width > 0
      if (visible && !this.element.classList.contains('is-paused') && !document.hidden) {
        activeScenes.add(this)
      } else {
        activeScenes.delete(this)
      }
      schedule()
    }

    cacheBackground() {
      const context = this.backgroundContext
      const colors = this.colors
      context.setTransform(this.scale, 0, 0, this.scale, 0, 0)
      context.clearRect(0, 0, this.width, this.height)
      context.lineCap = 'round'
      context.lineJoin = 'round'
      if (this.renderer) {
        this.renderer.cacheBackground(context, colors)
        return
      }
      plane(context, [[-HALF_LENGTH, -1.15, -1.15], [HALF_LENGTH, -1.15, -1.15], [HALF_LENGTH, 1.15, -1.15], [-HALF_LENGTH, 1.15, -1.15]], colors.real, 0.045)
      plane(context, [[-HALF_LENGTH, -1.15, -1.15], [HALF_LENGTH, -1.15, -1.15], [HALF_LENGTH, -1.15, 1.15], [-HALF_LENGTH, -1.15, 1.15]], colors.imaginary, 0.045)
      for (let index = 0; index <= 8; index++) {
        const time = -HALF_LENGTH + index / 8 * 2 * HALF_LENGTH
        line(context, [[time, -1.15, -1.15], [time, 1.15, -1.15]].map(project), colors.ink, 0.5, 0.12)
        line(context, [[time, -1.15, -1.15], [time, -1.15, 1.15]].map(project), colors.ink, 0.5, 0.12)
      }
      for (let value = -1; value <= 1; value += 0.5) {
        line(context, [[-HALF_LENGTH, value, -1.15], [HALF_LENGTH, value, -1.15]].map(project), colors.ink, 0.5, 0.12)
        line(context, [[-HALF_LENGTH, -1.15, value], [HALF_LENGTH, -1.15, value]].map(project), colors.ink, 0.5, 0.12)
      }
      const origin = [-HALF_LENGTH, -1.15, -1.15]
      line(context, [origin, [1.95, -1.15, -1.15]].map(project), colors.ink, 0.9, 0.5)
      line(context, [origin, [-HALF_LENGTH, 1.4, -1.15]].map(project), colors.ink, 0.9, 0.5)
      line(context, [origin, [-HALF_LENGTH, -1.15, 1.4]].map(project), colors.ink, 0.9, 0.5)
      line(context, [[-HALF_LENGTH, 0, 0], [HALF_LENGTH, 0, 0]].map(project), colors.accent, 0.7, 0.15)
      line(context, helix, colors.accent, 1.4, 0.28)
      line(context, realProjection, colors.real, 1.2, 0.3)
      line(context, imaginaryProjection, colors.imaginary, 1.2, 0.3)
      context.fillStyle = colors.ink
      context.font = 'italic 13px "STIX Two Text", Georgia, serif'
      const labels = [
        { text: 'φ', at: [1.98, -1.15, -1.15], offset: [3, 4] },
        { text: 'Re', at: [-HALF_LENGTH, 1.45, -1.15], offset: [0, 4] },
        { text: 'Im', at: [-HALF_LENGTH, -1.15, 1.5], offset: [-4, 0] },
      ]
      labels.forEach(label => {
        const [x, y] = project(label.at)
        context.fillText(label.text, x + label.offset[0], y + label.offset[1])
      })
    }

    render() {
      if (!this.scale) return
      const context = this.context
      const colors = this.colors
      const time = timeAt(phase)
      const real = Math.cos(phase)
      const imaginary = Math.sin(phase)
      const current = project([time, real, imaginary])
      const realPoint = project([time, real, -1.15])
      const imaginaryPoint = project([time, -1.15, imaginary])
      const center = project([time, 0, 0])
      context.setTransform(this.scale, 0, 0, this.scale, 0, 0)
      context.clearRect(0, 0, this.width, this.height)
      context.drawImage(this.background, 0, 0, this.width, this.height)
      if (this.renderer) {
        this.renderer.render(context, rotation, colors)
        return
      }
      context.lineCap = 'round'
      context.lineJoin = 'round'
      const circle = Array.from({ length: 49 }, (_, index) => {
        const angle = index / 48 * TAU
        return project([time, Math.cos(angle), Math.sin(angle)])
      })
      line(context, circle, colors.accent, 0.85, 0.4)
      drawTrail(context, helix, current, colors.accent, 2.3)
      drawTrail(context, realProjection, realPoint, colors.real, 1.35)
      drawTrail(context, imaginaryProjection, imaginaryPoint, colors.imaginary, 1.35)
      context.setLineDash([2.5, 3.5])
      line(context, [current, realPoint], colors.real, 0.9, 0.65)
      line(context, [current, imaginaryPoint], colors.imaginary, 0.9, 0.65)
      context.setLineDash([])
      line(context, [center, current], colors.accent, 1.5, 1)
      point(context, realPoint, colors.real, colors.background, 2.8)
      point(context, imaginaryPoint, colors.imaginary, colors.background, 2.8)
      point(context, current, colors.accent, colors.background, 4)
      context.fillStyle = colors.ink
      context.font = '10px "Source Sans 3", sans-serif'
      context.textAlign = 'left'
      context.fillText('COMPLEX ROTATION', 22, 265)
      context.textAlign = 'right'
      context.fillText(`φ = ${(phase / Math.PI).toFixed(2)}π`, 278, 265)
      context.textAlign = 'left'
    }
  }

  function tick(now) {
    frame = null
    if (!activeScenes.size) return
    const fps = mobileViewport.matches ? 24 : 30
    if (!previousPaint) previousPaint = now
    if (now - previousPaint >= 1000 / fps) {
      rotation += Math.min((now - previousPaint) / 1000, 0.1) * MAX_PHASE / PERIOD_SECONDS
      phase = rotation % MAX_PHASE
      previousPaint = now
      activeScenes.forEach(scene => scene.render())
    }
    frame = requestAnimationFrame(tick)
  }

  function schedule() {
    if (activeScenes.size && frame === null) {
      previousPaint = 0
      frame = requestAnimationFrame(tick)
    } else if (!activeScenes.size && frame !== null) {
      cancelAnimationFrame(frame)
      frame = null
      previousPaint = 0
    }
  }

  if (!('ResizeObserver' in window)) return
  document.querySelectorAll('[data-euler-scene]').forEach(element => {
    const scene = new EulerScene(element)
    if (scene.context) scenes.push(scene)
  })
  // Canvas colors and labels refresh when the theme or local fonts change.
  new MutationObserver(() => scenes.forEach(scene => scene.refreshColors())).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  document.fonts.ready.then(() => scenes.forEach(scene => scene.refreshColors()))
})()
