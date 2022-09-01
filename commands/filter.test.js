import { filterDelim, filterFixed } from './filter.js'

describe('filterDelim', () => {

  test('correctly determines filter values in a delimited file', async () => {
    const result = await filterDelim('./testing/sample.csv', 'Paper', 8)
    expect(result).toHaveLength(1)
    expect(result[0]).toMatch(/Paper/)
  })

  test('fails gracefully when index is invalid in a delimited file', async () => {
    expect.assertions(1)
    return filterDelim('./testing/sample.csv', '', 'a').catch(err => expect(err.message).toMatch(/a positive natural integer/))
  })

  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return filterDelim('./testing/does-not-exist.xyz', '', 0).catch(err => expect(err.message).toMatch(/does not exist/))
  })

  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return filterDelim(null, '', 0).catch(err => expect(err.message).toMatch(/valid string/))
  })

})

describe('filterFixed', () => {

  test('correctly determines filter values in a fixed-width file', async () => {
    const result = await filterFixed('./testing/sample.txt', 'No', 69, 72)
    expect(result).toHaveLength(3)
  })

  test('correctly uses negative values in a fixed-width file', async () => {
    const result = await filterFixed('./testing/sample.txt', 'No', -4)
    expect(result).toHaveLength(5)
  })

  test('fails gracefully when begin is invalid', async () => {
    expect.assertions(1)
    return filterFixed('./testing/sample.txt', 0, '').catch(err => expect(err.message).toMatch(/a integer/))
  })

  test('fails gracefully when end is invalid', async () => {
    expect.assertions(1)
    return filterFixed('./testing/sample.txt', 0, '').catch(err => expect(err.message).toMatch(/a integer/))
  })

  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return filterFixed('./testing/does-not-exist.xyz', '', 0).catch(err => expect(err.message).toMatch(/does not exist/))
  })

  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return filterFixed(null, '', 0).catch(err => expect(err.message).toMatch(/valid string/))
  })

})
