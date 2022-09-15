import { sample } from './sample.js'

describe('sample', () => {
  test('samples the number of rows in a fixed-width file', async () => {
    const result = await sample('./testing/sample.txt', 0, 3)
    expect(result).toHaveLength(3)
  })

  test('samples the number of rows in a fixed-width file with a string index', async () => {
    const result = await sample('./testing/sample.txt', '0', '3')
    expect(result).toHaveLength(3)
  })

  test('samples the number of rows in a delimited file', async () => {
    const result = await sample('./testing/sample.csv', 0, 3)
    expect(result).toHaveLength(3)
  })
  
  test('samples the number of rows in a delimited file with a string index', async () => {
    const result = await sample('./testing/sample.csv', '0', '3')
    expect(result).toHaveLength(3)
  })
  
  test('samples the correct rows', async () => {
    const result = await sample('./testing/sample.txt', 5, 1)
    expect(result).toHaveLength(1)
    expect(result[0]).toMatch(/80507/)
  })
  
  test('fails gracefully when offset is invalid', async () => {
    expect.assertions(1)
    return sample('./testing/sample.txt', -1, 0).catch(err => expect(err.message).toMatch(/positive integer/))
  })
  
  test('fails gracefully when length is invalid', async () => {
    expect.assertions(1)
    return sample('./testing/sample.txt', 0, 0).catch(err => expect(err.message).toMatch(/positive natural integer/))
  })
  
  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return sample('./testing/does-not-exist.xyz').catch(err => expect(err.message).toMatch(/does not exist/))
  })
  
  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return sample().catch(err => expect(err.message).toMatch(/valid string/))
  })
})
