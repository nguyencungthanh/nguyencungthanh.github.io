const mql = window.matchMedia('(prefers-color-scheme: dark)')
let userTheme = null
try { userTheme = localStorage.getItem('t') } catch {}

function toggleTheme(to) {
  userTheme = to || null
  try {
    if (to) localStorage.setItem('t', to)
    else localStorage.removeItem('t')
  } catch {}

  handleTheme()
}

function handleTheme(query) {
  if (!query) {
    query = mql
  }

  const addDark = userTheme === null ? query.matches : userTheme === 'd'

  if (addDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function setupTheme() {
  mql.addEventListener('change', handleTheme)
  handleTheme(mql)
}

setupTheme()

function addEmoji() {
  const today = new Date()
  const month = today.getMonth() + 1
  const day = today.getDate()
  let emoji = null
  let title = ''

  if (month === 1 && day <= 2) {
    emoji = '🥂'
    title = 'Happy New Year!'
  } else if (month === 5 && day === 17) {
    emoji = '🌈'
    title = 'International Day Against Homophobia, Biphobia and Transphobia'
  } else if (month === 11 && day === 11) {
    emoji = '🎂'
    title = 'Happy Birthday to Me!'
  } else if (month === 10 && day >= 30) {
    emoji = '🎃'
    title = 'Happy Halloween!'
  } else if (month === 11 && day === 1) {
    emoji = '👻'
    title = `Happy All Saint's Day!`
  } else if (month === 12 && day === 5) {
    emoji = '🍪'
    title = 'Prettige Sinterklaas!'
  } else if (month === 12 && day >= 20 && day <= 26) {
    emoji = '🎄'
    title = 'Happy Christmas!'
  }

  const el = document.querySelector('#header .name')
  if (emoji && el) {
    const span = document.createElement('span')
    span.title = title
    span.innerText = emoji
    el.append(' ', span)
  }
}

function parseEmojis() {
  if (typeof twemoji === 'undefined') return
  twemoji.parse(document.body, {
    base: 'https://media.hacdias.com/emoji/16.0.1/',
    folder: 'svg',
    ext: '.svg',
  })
}

function setupPreview() {
  const preview = document.createElement('div')

  preview.id = 'preview'
  preview.className = 'dn'
  preview.tabIndex = -1
  preview.setAttribute('role', 'dialog')
  preview.setAttribute('aria-label', 'Image preview. Press Escape to close.')
  let previousFocus
  function closePreview() {
    preview.classList.add('dn')
    preview.replaceChildren()
    previousFocus?.focus()
  }
  preview.addEventListener('click', closePreview)
  preview.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePreview()
  })

  document.body.appendChild(preview)

  const images = document.querySelectorAll('article figure img')
  Array.from(images).forEach((img) => {
    img.style.cursor = 'zoom-in'
    img.addEventListener('click', () => {
      const enlarged = document.createElement('img')
      enlarged.src = img.currentSrc || img.src
      enlarged.alt = img.alt
      previousFocus = document.activeElement
      preview.replaceChildren(enlarged)
      preview.classList.remove('dn')
      preview.focus()
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  addEmoji()
  parseEmojis()
  setupPreview()
})
