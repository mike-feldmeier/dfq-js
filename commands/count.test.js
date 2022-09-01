import { count } from './count.js'

describe('count', () => {
  test('counts the number of rows in a fixed-width file', async () => {
    const result = await count('./testing/sample.txt')
    expect(result).toEqual(17)
  })
  
  test('counts the number of rows in a delimited file', async () => {
    const result = await count('./testing/sample.csv')
    expect(result).toEqual(10)
  })
  
  test('fails gracefully when the file doesn\'t exist', async () => {
    expect.assertions(1)
    return count('./testing/does-not-exist.xyz').catch(err => expect(err.message).toMatch(/does not exist/))
  })
  
  test('fails gracefully when the file wasn\'t specified', async () => {
    expect.assertions(1)
    return count().catch(err => expect(err.message).toMatch(/valid string/))
  })
})
