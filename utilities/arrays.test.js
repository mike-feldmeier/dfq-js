import { coalesce } from './arrays.js'

describe('coalesce', () => {
  test('return the first valid value', async () => {
    const result = coalesce(null, null, '1')
    expect(result).toEqual('1')
  })
  test('return the first valid value', async () => {
    const result = coalesce(0, 0, 1)
    expect(result).toEqual(1)
  })
  test('not return a non-valid value', async () => {
    const result = coalesce(null, null, null)
    expect(result).toBeUndefined()
  })
})
