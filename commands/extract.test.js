import { extractDelim, extractFixed } from './extract.js'

describe('extractDelim', () => {

  test('correctly determines extract values in a delimited file', async () => {
    const result = await extractDelim('./testing/sample.csv', 8)
    expect(result).toHaveLength(10)
    expect(result[0]).toMatch(/Storage & Organization/)
    expect(result[9]).toMatch(/Paper/)
  })

  test('correctly determines extract values in a delimited file with a string index', async () => {
    const result = await extractDelim('./testing/sample.csv', '8')
    expect(result).toHaveLength(10)
    expect(result[0]).toMatch(/Storage & Organization/)
    expect(result[9]).toMatch(/Paper/)
  })

  test('fails gracefully when index is invalid in a delimited file', async () => {
    expect.assertions(1)
    return extractDelim('./testing/sample.csv', 'a').catch(err => expect(err.message).toMatch(/a positive natural integer/))
  })

  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return extractDelim('./testing/does-not-exist.xyz', 0).catch(err => expect(err.message).toMatch(/does not exist/))
  })

  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return extractDelim(null, 0).catch(err => expect(err.message).toMatch(/valid string/))
  })

})

describe('extractFixed', () => {

  test('correctly determines extract values in a fixed-width file', async () => {
    const result = await extractFixed('./testing/sample.txt', 69, 72)
    expect(result).toHaveLength(17)
    expect(result).toContain('Yes')
    expect(result).toContain('No')
  })

  test('correctly determines extract values in a fixed-width file with string indices', async () => {
    const result = await extractFixed('./testing/sample.txt', '69', '72')
    expect(result).toHaveLength(17)
    expect(result).toContain('Yes')
    expect(result).toContain('No')
  })

  test('correctly uses negative values in a fixed-width file', async () => {
    const result = await extractFixed('./testing/sample.txt', -4)
    expect(result).toHaveLength(17)
    expect(result).toContain('Yes')
    expect(result).toContain('No')
  })

  test('correctly uses negative values in a fixed-width file with string indices', async () => {
    const result = await extractFixed('./testing/sample.txt', '-4')
    expect(result).toHaveLength(17)
    expect(result).toContain('Yes')
    expect(result).toContain('No')
  })

  test('fails gracefully when begin is invalid', async () => {
    expect.assertions(1)
    return extractFixed('./testing/sample.txt', '').catch(err => expect(err.message).toMatch(/an integer/))
  })

  test('fails gracefully when end is invalid', async () => {
    expect.assertions(1)
    return extractFixed('./testing/sample.txt', 1, '').catch(err => expect(err.message).toMatch(/an integer/))
  })

  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return extractFixed('./testing/does-not-exist.xyz', 0).catch(err => expect(err.message).toMatch(/does not exist/))
  })

  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return extractFixed(null, 0).catch(err => expect(err.message).toMatch(/valid string/))
  })

})
