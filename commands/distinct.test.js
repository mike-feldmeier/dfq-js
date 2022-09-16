import { distinctDelim, distinctFixed } from './distinct.js'

describe('distinctDelim', () => {

  test('correctly determines distinct values in a delimited file', async () => {
    const result = await distinctDelim('./testing/sample.csv', 8)
    expect(result).toHaveLength(6)
    expect(result).toEqual(expect.arrayContaining(['Storage & Organization', 'Appliances', 'Binders and Binder Accessories', 'Telephones and Communication', 'Office Furnishings', 'Paper']))
  })

  test('correctly determines distinct values in a delimited file with string index', async () => {
    const result = await distinctDelim('./testing/sample.csv', '8')
    expect(result).toHaveLength(6)
    expect(result).toEqual(expect.arrayContaining(['Storage & Organization', 'Appliances', 'Binders and Binder Accessories', 'Telephones and Communication', 'Office Furnishings', 'Paper']))
  })

  test('fails gracefully when index is invalid in a delimited file', async () => {
    expect.assertions(1)
    return distinctDelim('./testing/sample.csv', 'a', 0).catch(err => expect(err.message).toMatch(/a positive natural integer/))
  })

  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return distinctDelim('./testing/does-not-exist.xyz', 0).catch(err => expect(err.message).toMatch(/does not exist/))
  })

  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return distinctDelim(null, 0).catch(err => expect(err.message).toMatch(/valid string/))
  })

})

describe('distinctFixed', () => {

  test('correctly determines distinct values in a fixed-width file', async () => {
    const result = await distinctFixed('./testing/sample.txt', 69, 72)
    expect(result).toHaveLength(2)
    expect(result).toEqual(expect.arrayContaining(['Yes', 'No']))
  })

  test('correctly determines distinct values in a fixed-width file with a string index', async () => {
    const result = await distinctFixed('./testing/sample.txt', '69', '72')
    expect(result).toHaveLength(2)
    expect(result).toEqual(expect.arrayContaining(['Yes', 'No']))
  })

  test('correctly uses negative values in a fixed-width file', async () => {
    const result = await distinctFixed('./testing/sample.txt', -4)
    expect(result).toHaveLength(2)
    expect(result).toEqual(expect.arrayContaining(['Yes', 'No']))
  })

  test('correctly uses negative values in a fixed-width file with a string index', async () => {
    const result = await distinctFixed('./testing/sample.txt', '-4')
    expect(result).toHaveLength(2)
    expect(result).toEqual(expect.arrayContaining(['Yes', 'No']))
  })

  test('fails gracefully when begin is invalid', async () => {
    expect.assertions(1)
    return distinctFixed('./testing/sample.txt', 'a', 0).catch(err => expect(err.message).toMatch(/an integer/))
  })

  test('fails gracefully when end is invalid', async () => {
    expect.assertions(1)
    return distinctFixed('./testing/sample.txt', 0, 'z').catch(err => expect(err.message).toMatch(/an integer/))
  })

  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return distinctFixed('./testing/does-not-exist.xyz', 0, 0).catch(err => expect(err.message).toMatch(/does not exist/))
  })

  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return distinctFixed(null, 0, 0).catch(err => expect(err.message).toMatch(/valid string/))
  })

})
