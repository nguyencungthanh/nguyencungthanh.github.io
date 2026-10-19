import training from './kernel-svm-data.json'

// Playback only: SMO optimization and contour extraction run at authoring time.
// Regenerate with: python3 scripts/generate-kernel-svm.py
for (const scene of document.querySelectorAll('[data-kernel-svm]')) {
  const layers = Array.from(scene.querySelectorAll('[data-svm-layer]'))
  const paths = layers.map(layer => ({
    boundary: layer.querySelector('[data-svm-boundary]')
  }))
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let index = 0
  let activeLayer = 0
  let timer = null

  function draw(frame) {
    const next = 1 - activeLayer
    paths[next].boundary.setAttribute('d', frame.boundary)
    layers[activeLayer].style.opacity = '0'
    layers[next].style.opacity = '1'
    activeLayer = next

  }

  function tick() {
    const final = index === training.frames.length - 1
    draw(training.frames[index])
    index = (index + 1) % training.frames.length
    timer = window.setTimeout(tick, final ? 3600 : 1000)
  }

  scene.addEventListener('ambient:visibility', event => {
    window.clearTimeout(timer)
    timer = null
    if (reducedMotion.matches) {
      draw(training.frames[training.frames.length - 1])
      index = 0
    } else if (!event.detail.paused) {
      tick()
    }
  })
  scene.classList.add('is-paused')
}
