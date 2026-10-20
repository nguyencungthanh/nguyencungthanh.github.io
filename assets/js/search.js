import { findPages } from './search-model.mjs'

(() => {
  const form = document.getElementById('search-form')
  const input = form?.querySelector('input[name="q"]')
  const results = document.getElementById('search-results')
  const status = document.getElementById('search-status')
  if (!form || !input || !results || !status) return

  let indexPromise
  let requestID = 0
  let mathRendering = Promise.resolve()

  function setStatus(message) {
    const box = document.createElement('div')
    box.className = 'box'
    const paragraph = document.createElement('p')
    paragraph.textContent = message
    box.appendChild(paragraph)
    status.replaceChildren(box)
  }

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(form.dataset.indexUrl).then(response => {
        if (!response.ok) throw new Error('Failed to load search index')
        return response.json()
      }).catch(error => {
        indexPromise = null
        throw error
      })
    }
    return indexPromise
  }

  async function executeSearch(query) {
    const currentID = ++requestID
    window.MathJax?.typesetClear?.([results])
    results.replaceChildren()
    if (!query) {
      setStatus("ℹ️ You haven't searched for anything yet!")
      return
    }
    setStatus('Searching…')
    try {
      const index = await loadIndex()
      // Rapid submissions and Back/Forward must never show an older query.
      if (currentID !== requestID) return
      renderResults(findPages(index, query))
    } catch (error) {
      if (currentID !== requestID) return
      console.error(error)
      setStatus('❌ An error occurred while searching. Please try again.')
    }
  }

  function renderResults(items) {
    if (!items.length) {
      setStatus('👀 Searched and searched, but nothing could be found!')
      return
    }
    setStatus(`${items.length} ${items.length === 1 ? 'result' : 'results'} found.`)
    const fragment = document.createDocumentFragment()
    items.forEach(item => {
      const card = document.createElement('article')
      card.className = 'card'
      const header = document.createElement('header')
      const heading = document.createElement('h2')
      const link = document.createElement('a')
      link.className = 'nl'
      link.href = item.permalink
      link.textContent = item.title
      heading.appendChild(link)
      header.appendChild(heading)
      if (item.date) {
        const date = document.createElement('p')
        date.className = 'lg small'
        date.textContent = `Published on ${item.date}`
        header.appendChild(date)
      }
      const summary = document.createElement('p')
      summary.className = 'copy'
      summary.textContent = item.summary || `${(item.content || '').slice(0, 200)}…`
      const readMore = document.createElement('a')
      readMore.href = item.permalink
      readMore.className = 'button small'
      readMore.textContent = 'Read More →'
      card.append(header, summary, readMore)
      fragment.appendChild(card)
    })
    results.replaceChildren(fragment)
    // Later searches and history changes also need equation rendering.
    mathRendering = mathRendering
      .then(() => window.MathJax?.typesetPromise?.([results]))
      .catch(error => console.error(error))
  }

  function searchFromURL() {
    const params = new URLSearchParams(window.location.search)
    input.value = (params.get('q') ?? params.get('query') ?? '').trim()
    executeSearch(input.value)
  }

  form.addEventListener('submit', event => {
    event.preventDefault()
    const query = input.value.trim()
    input.value = query
    const url = new URL(window.location.href)
    url.searchParams.delete('query')
    if (query) url.searchParams.set('q', query)
    else url.searchParams.delete('q')
    if (url.href !== window.location.href) window.history.pushState({}, '', url)
    executeSearch(query)
  })
  window.addEventListener('popstate', searchFromURL)
  searchFromURL()
})()
