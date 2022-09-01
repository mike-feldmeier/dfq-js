import lineReader from 'line-reader'
import util from 'util'

const eachLine = util.promisify(lineReader.eachLine)

const sample = async (filename, offset=0, length=10) => {
  const result = []
  let lineCount = 0

  if(offset < 0) {
    throw new Error(`The given offset of "${offset}" does not resolve to a positive integer`)
  }

  if(length < 1) {
    throw new Error(`The given length of "${length}" does not resolve to a positive natural integer`)
  }

  try {
    await eachLine(filename, line => {
      if(lineCount >= offset) {
        result.push(line)
      }
      if(result.length >= length) {
        return false
      }
      ++lineCount
    })
  }
  catch(err) {
    if(err.code === 'ENOENT') {
      throw new Error(`The given filename "${filename}" does not exist`)
    }
    if(err.name === 'TypeError') {
      throw new TypeError('The filename needs to be a valid string')
    }
  }

  return result
}

export { sample }
