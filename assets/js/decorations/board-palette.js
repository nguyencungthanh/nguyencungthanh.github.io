/* Canvas and SVG boards share theme colors, with the original light palette as fallback. */
export function readBoardColors(element, defaults, prefix = 'board') {
  const style = getComputedStyle(element)
  return Object.fromEntries(Object.entries(defaults).map(([name, fallback]) => [
    name,
    style.getPropertyValue(`--${prefix}-${name}`).trim() || style.getPropertyValue(`--board-${name}`).trim() || fallback,
  ]))
}

export function boardSvgColors(defaults, prefix = 'board') {
  return Object.fromEntries(Object.entries(defaults).map(([name, fallback]) => [
    name,
    prefix === 'board' ? `var(--board-${name}, ${fallback})` : `var(--${prefix}-${name}, var(--board-${name}, ${fallback}))`,
  ]))
}
