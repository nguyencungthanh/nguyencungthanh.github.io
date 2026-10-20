const normalize = value => String(value || '').normalize('NFC').toLowerCase()

export function findPages(pages, query) {
  const term = normalize(query).trim()
  if (!term) return []
  return pages.filter(page => [page.title, page.content, page.summary, ...(page.tags || [])]
    .some(value => normalize(value).includes(term)))
}
