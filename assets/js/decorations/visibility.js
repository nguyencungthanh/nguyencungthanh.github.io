(() => {
  const decorations = Array.from(document.querySelectorAll('[data-ambient-animation]'))
  const visibleDecorations = new Set(decorations)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  function updateAnimations() {
    decorations.forEach(decoration => {
      const paused = document.hidden || reducedMotion.matches || !visibleDecorations.has(decoration)
      if (decoration.classList.contains('is-paused') === paused) return
      decoration.classList.toggle('is-paused', paused)
      decoration.dispatchEvent(new CustomEvent('ambient:visibility', { detail: { paused } }))
    })
  }

  // Share visibility handling across the mathematics and project decorations.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleDecorations.add(entry.target)
        } else {
          visibleDecorations.delete(entry.target)
        }
      })
      updateAnimations()
    })
    decorations.forEach(decoration => observer.observe(decoration))
  }

  document.addEventListener('visibilitychange', updateAnimations)
  reducedMotion.addEventListener('change', updateAnimations)
  updateAnimations()
})()
