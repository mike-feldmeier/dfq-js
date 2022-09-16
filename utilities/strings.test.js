import { prepareNumber } from './strings.js'

describe('prepareNumber', () => {
  test('should pass through a basic number', async () => {
    const result = prepareNumber('12345.00')
    expect(result).toEqual('12345.00')
  })
  test('should process a comma-ed number', async () => {
    const result = prepareNumber('12,345.00')
    expect(result).toEqual('12345.00')
  })
})
