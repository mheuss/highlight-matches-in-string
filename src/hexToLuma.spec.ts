import { hexToLuma } from './hexToLuma'

describe('Test of hexToLuma', () => {
  it('Should return a white when given a black', () => {
    const results = hexToLuma('#000000')
    expect(results).toEqual('white')
  })

  it('Should return a black when given a white', () => {
    const results = hexToLuma('#FFFFFF')
    expect(results).toEqual('black')
  })

  it('Should return black when light gray', () => {
    expect(hexToLuma('#AAAAAA')).toEqual('black')
  })

  it('Should return black when light red', () => {
    expect(hexToLuma('#FFAAAA')).toEqual('black')
  })

  it('Should return white when given a dark blue', () => {
    expect(hexToLuma('#222266')).toEqual('white')
  })
})
