(() => {
  const article = document.querySelector('.multilingual-post')
  if (!article) return

  const blocks = Array.from(article.querySelectorAll('[data-post-lang]'))
  const languages = new Set(blocks.map(block => block.dataset.postLang))
  const toolbar = article.querySelector('.post-language-toolbar')
  if (!toolbar) return
  const buttons = Array.from(toolbar.querySelectorAll('[data-lang]'))
  const label = toolbar.querySelector('.post-language-label')
  const toc = article.querySelector('#TableOfContents')
  const tocHeading = article.querySelector('.toc-heading')
  const storageKey = 'blog-lang'

  function getHashTarget() {
    try {
      return document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
    } catch {
      return null
    }
  }

  // Filter Hugo's TOC so heading levels and existing anchor IDs stay intact.
  function filterList(list, language) {
    const filtered = list.cloneNode(false)
    Array.from(list.children).forEach(item => {
      const copy = item.cloneNode(false)
      const link = Array.from(item.children).find(child => child.tagName === 'A')
      const heading = link && document.getElementById(decodeURIComponent(link.hash.slice(1)))
      const block = heading && heading.closest('[data-post-lang]')
      const includeLink = link && (!block || block.dataset.postLang === language)
      if (includeLink) copy.appendChild(link.cloneNode(true))

      Array.from(item.children).filter(child => child.tagName === 'UL').forEach(child => {
        const nested = filterList(child, language)
        if (nested.children.length) copy.appendChild(nested)
      })

      if (includeLink) {
        filtered.appendChild(copy)
      } else {
        // Promote matching descendants when their parent belongs to another language.
        Array.from(copy.children).forEach(nested => filtered.append(...nested.children))
      }
    })
    return filtered
  }

  const tables = new Map()
  if (toc) {
    languages.forEach(language => {
      const fragment = document.createDocumentFragment()
      Array.from(toc.children).filter(child => child.tagName === 'UL').forEach(list => {
        const filtered = filterList(list, language)
        if (filtered.children.length) fragment.appendChild(filtered)
      })
      tables.set(language, fragment)
    })
  }

  blocks.forEach(block => { block.lang = block.dataset.postLang })
  buttons.forEach(button => { button.hidden = !languages.has(button.dataset.lang) })

  function setLanguage(language) {
    if (!languages.has(language)) return
    article.dataset.activeLang = language
    blocks.forEach(block => { block.hidden = block.dataset.postLang !== language })
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language))
    })
    label.textContent = language === 'vi' ? 'Ngôn ngữ bài viết' : 'Reading language'
    label.lang = language

    if (toc) {
      toc.replaceChildren(tables.get(language).cloneNode(true))
      toc.lang = language
      toc.setAttribute('aria-label', language === 'vi' ? 'Mục lục' : 'Table of Contents')
      tocHeading.textContent = language === 'vi' ? 'Mục lục' : 'Table of Contents'
      tocHeading.lang = language
    }

    // Switching still works when browser privacy settings block local storage.
    try { localStorage.setItem(storageKey, language) } catch {}
  }

  let savedLanguage
  try { savedLanguage = localStorage.getItem(storageKey) } catch {}
  const target = getHashTarget()
  const targetBlock = target && article.contains(target) && target.closest('[data-post-lang]')
  const defaultLanguage = languages.has('vi') ? 'vi' : blocks[0].dataset.postLang
  setLanguage(targetBlock ? targetBlock.dataset.postLang : languages.has(savedLanguage) ? savedLanguage : defaultLanguage)
  toolbar.hidden = languages.size < 2

  buttons.forEach(button => button.addEventListener('click', () => {
    setLanguage(button.dataset.lang)
    const target = getHashTarget()
    if (target && article.contains(target) && target.closest('[data-post-lang][hidden]')) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }))

  // Shared section links reveal the correct translation, including browser Back/Forward.
  function revealHashTarget() {
    const target = getHashTarget()
    const block = target && article.contains(target) && target.closest('[data-post-lang]')
    if (!block) return
    if (block.hidden) setLanguage(block.dataset.postLang)
    requestAnimationFrame(() => target.scrollIntoView())
  }
  window.addEventListener('hashchange', revealHashTarget)
  if (targetBlock) revealHashTarget()
})()
