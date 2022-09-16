import { sumDelim, sumFixed } from './sum.js'

describe('sumDelim', () => {

  test('correctly determines sum values in a delimited file', async () => {
    const result = await sumDelim('./testing/sample.csv', 6)
    expect(result).toEqual(178.16)
  })

  test('correctly determines sum values in a delimited file with a string index', async () => {
    const result = await sumDelim('./testing/sample.csv', '6')
    expect(result).toEqual(178.16)
  })

  test('fails gracefully when index is invalid in a delimited file', async () => {
    expect.assertions(1)
    return sumDelim('./testing/sample.csv', 'a').catch(err => expect(err.message).toMatch(/a positive natural integer/))
  })

  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return sumDelim('./testing/does-not-exist.xyz', 0).catch(err => expect(err.message).toMatch(/does not exist/))
  })

  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return sumDelim(null, 0).catch(err => expect(err.message).toMatch(/valid string/))
  })

})

describe('sumFixed', () => {

  test('correctly determines sum values in a fixed-width file', async () => {
    const result = await sumFixed('./testing/sample.txt', 105, 125)
    expect(result).toEqual(141242.32)
  })

  test('correctly determines sum values in a fixed-width file with string indices', async () => {
    const result = await sumFixed('./testing/sample.txt', '105', '125')
    expect(result).toEqual(141242.32)
  })

  test('correctly uses negative values in a fixed-width file', async () => {
    const result = await sumFixed('./testing/sample.txt', (105-133), (125-133))
    expect(result).toEqual(141242.32)
  })

  test('correctly uses negative values in a fixed-width file with string indices', async () => {
    const result = await sumFixed('./testing/sample.txt', `${105-133}`, `${125-133}`)
    expect(result).toEqual(141242.32)
  })

  test('fails gracefully when begin is invalid', async () => {
    expect.assertions(1)
    return sumFixed('./testing/sample.txt', '').catch(err => expect(err.message).toMatch(/an integer/))
  })

  test('fails gracefully when end is invalid', async () => {
    expect.assertions(1)
    return sumFixed('./testing/sample.txt', 1, '').catch(err => expect(err.message).toMatch(/an integer/))
  })

  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return sumFixed('./testing/does-not-exist.xyz', 0).catch(err => expect(err.message).toMatch(/does not exist/))
  })

  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return sumFixed(null, 0).catch(err => expect(err.message).toMatch(/valid string/))
  })

})
