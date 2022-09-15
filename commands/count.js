import lineReader from 'line-reader'
import util from 'util'

const eachLine = util.promisify(lineReader.eachLine)

const count = async (filename) => {
  let lineCount = 0

  try {
    await eachLine(filename, _ => ++lineCount)
  }
  catch(err) {
    if(err.code === 'ENOENT') {
      throw new Error(`The given filename "${filename}" does not exist`)
    }
    if(err.name === 'TypeError') {
      throw new TypeError('The filename needs to be a valid string')
    }
  }

  return lineCount
}

export { count }
