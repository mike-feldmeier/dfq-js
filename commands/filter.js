import lineReader from 'line-reader'
import util from 'util'
import { extractDelimValue, extractFixedValue } from '../utilities/strings.js'

const eachLine = util.promisify(lineReader.eachLine)

const filterDelim = async (filename, key, index, delimiter, qualifier) => {
  const result = []

  if(!Number.isInteger(index) || index < 0) {
    throw new Error(`The given index of "${index}" does not resolve to a positive natural integer`)
  }

  try {
    await eachLine(filename, line => {
      const value = extractDelimValue(line, index, delimiter, qualifier)
      if(value.toLowerCase() === key.toLowerCase()) {
        result.push(line)
      }
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

const filterFixed = async (filename, key, begin, end) => {
  const result = []
  
  if(!Number.isInteger(begin)) {
    throw new Error(`The given beginning index of "${begin}" does not resolve to a integer`)
  }

  if(end && !Number.isInteger(end)) {
    throw new Error(`The given beginning index of "${end}" does not resolve to a integer`)
  }

  try {
    await eachLine(filename, line => {
      const value = extractFixedValue(line, begin, end)
      if(value.toLowerCase() === key.toLowerCase()) {
        result.push(line)
      }
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

export { filterDelim, filterFixed }
