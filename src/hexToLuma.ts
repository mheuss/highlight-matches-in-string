import memoizer from 'memoizerific'

/*
  I wish I could say this was my work. But... credit where credit is due - I adapted this from here:

  https://stackoverflow.com/questions/1855884/determine-font-color-based-on-background-color
 */

export function hexToLuma(color: string): 'black' | 'white' {
  const hex = color.replace(/#/, '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  const luma = [0.299 * r, 0.587 * g, 0.114 * b].reduce((a, b) => a + b) / 255

  return luma > 0.5 ? 'black' : 'white'
}

export default memoizer(10)(hexToLuma)
