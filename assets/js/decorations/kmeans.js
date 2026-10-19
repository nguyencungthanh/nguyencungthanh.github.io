(() => {
  document.querySelectorAll('[data-kmeans]').forEach(scene => {
    const dots = Array.from(scene.querySelectorAll('[data-point]'))
    const points = dots.map(dot => [Number(dot.getAttribute('cx')), Number(dot.getAttribute('cy'))])
    const markers = Array.from(scene.querySelectorAll('[data-centroid]'))
    const regions = Array.from(scene.querySelectorAll('[data-cluster-region]'))
    // Precompute Lloyd's iterations once, not on every animation frame.
    let centers = [[55, 45], [110, 105], [200, 175]]
    const frames = []
    for (let iteration = 1; iteration <= 20; iteration++) {
      const labels = points.map(point => {
        const distances = centers.map(center => (point[0] - center[0]) ** 2 + (point[1] - center[1]) ** 2)
        return distances.indexOf(Math.min(...distances))
      })
      frames.push({ centers, labels })
      const next = centers.map((center, group) => {
        const members = points.filter((_, index) => labels[index] === group)
        return members.length ? [0, 1].map(axis => members.reduce((sum, point) => sum + point[axis], 0) / members.length) : center
      })
      const converged = next.every((center, i) => Math.hypot(center[0] - centers[i][0], center[1] - centers[i][1]) < 0.01)
      frames.push({ centers: next, labels })
      centers = next
      if (converged) break
    }
    function hull(members) {
      const sorted = members.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])
      const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
      const half = items => {
        const result = []
        items.forEach(point => {
          while (result.length > 1 && cross(result[result.length - 2], result[result.length - 1], point) <= 0) result.pop()
          result.push(point)
        })
        return result.slice(0, -1)
      }
      return half(sorted).concat(half(sorted.slice().reverse())).map(point => point.join(',')).join(' ')
    }
    frames.forEach(frame => {
      frame.regions = centers.map((_, group) => hull(points.filter((_, i) => frame.labels[i] === group)))
    })
    let index = 0
    let timer = null
    let lastLabels
    function draw(frame) {
      if (lastLabels !== frame.labels) {
        dots.forEach((dot, i) => dot.setAttribute('class', `cluster-point ${frame.labels ? `cluster-${frame.labels[i]}` : 'cluster-unassigned'}`))
        regions.forEach((region, group) => region.setAttribute('points', frame.regions[group]))
        lastLabels = frame.labels
      }
      markers.forEach((marker, i) => { marker.style.transform = `translate(${frame.centers[i][0]}px, ${frame.centers[i][1]}px)` })
    }
    function tick() {
      draw(frames[index])
      const delay = index === frames.length - 1 ? 3600 : 1600
      index = (index + 1) % frames.length
      timer = window.setTimeout(tick, delay)
    }
    function stop() {
      window.clearTimeout(timer)
      timer = null
    }
    scene.addEventListener('ambient:visibility', event => {
      stop()
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        draw(frames[frames.length - 1])
        index = 0
      } else if (!event.detail.paused) tick()
    })
    // visibility.js owns starting and stopping this scene, including initial load.
    scene.classList.add('is-paused')
  })
})()
