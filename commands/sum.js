import lineReader from 'line-reader'
import util from 'util'
import { coalesce } from '../utilities/arrays.js'
import { extractDelimValue, extractFixedValue, prepareNumber} from '../utilities/strings.js'

const eachLine = util.promisify(lineReader.eachLine)

const sumDelim = async (filename, index, delimiter, qualifier) => {
  let result = 0

  if(isNaN(parseInt(index)) || parseInt(index) < 0) {
    throw new Error(`The given index of "${index}" does not resolve to a positive natural integer`)
  }

  try {
    await eachLine(filename, line => {
      const value = prepareNumber(coalesce(extractDelimValue(line, index, delimiter, qualifier), '0'))
      if(!isNaN(parseFloat(value))) {
        result += parseFloat(value)
      }
      else {
        throw new Error(`The value "${value}" does not resolve to an integer`)
      }
    })
  }
  catch(err) {
    if(err.code === 'ENOENT') {
      throw new Error(`The given filename "${filename}" does not exist`)
    }
    else if(err.name === 'TypeError') {
      throw new TypeError('The filename needs to be a valid string')
    }
    else {
      throw new Error('An error occurred while processing the file', { cause: err })
    }
  }

  return result
}

const sumFixed = async (filename, begin, end) => {
  let result = 0
  
  if(isNaN(parseInt(begin))) {
    throw new Error(`The given beginning index of "${begin}" does not resolve to an integer`)
  }

  if(end !== undefined && isNaN(parseInt(end))) {
    throw new Error(`The given beginning index of "${end}" does not resolve to an integer`)
  }

  try {
    await eachLine(filename, line => {
      const value = prepareNumber(coalesce(extractFixedValue(line, begin, end), '0'))
      if(!isNaN(parseFloat(value))) {
        result += parseFloat(value)
      }
      else {
        throw new Error(`The value "${value}" does not resolve to an integer`)
      }
    })
  }
  catch(err) {
    if(err.code === 'ENOENT') {
      throw new Error(`The given filename "${filename}" does not exist`)
    }
    else if(err.name === 'TypeError') {
      throw new TypeError('The filename needs to be a valid string')
    }
    else {
      throw new Error('An error occurred while processing the file', { cause: err })
    }
  }
  
  return result
}

export { sumDelim, sumFixed }
