(() => {
  const networks = Array.from(document.querySelectorAll('.project-network'))
  const visibleNetworks = new Set(networks)

  function updateAnimations() {
    networks.forEach(network => {
      network.classList.toggle('is-paused', document.hidden || !visibleNetworks.has(network))
    })
  }

  // Stop offscreen mobile decorations and animations in background tabs.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visibleNetworks.add(entry.target)
        } else {
          visibleNetworks.delete(entry.target)
        }
      })
      updateAnimations()
    })
    networks.forEach(network => observer.observe(network))
  }

  document.addEventListener('visibilitychange', updateAnimations)
  updateAnimations()
})()
