const extractFixedValue = (line, begin, end) => line.slice(begin, end).trim()

const extractDelimValue = (line, index, delimiter=',', qualifier='"') => {
  const arr = parseDelimitedLine(line, delimiter, qualifier)

  if(index > arr.length) {
    return undefined
  }

  let value = arr[index]
  value = value.startsWith(qualifier) ? value.slice(qualifier.length) : value
  value = value.endsWith(qualifier) ? value.slice(-qualifier.length) : value
  return value.trim()
}

const parseDelimitedLine = (line, delimiter, qualifier) => {
  const result = ['']
  let insideQualifier = false

  for(const c of line) {
    switch(c) {
      case qualifier:
        insideQualifier = !insideQualifier
        break
      case delimiter:
        if(!insideQualifier) {
          result.push('')
        }
        else {
          result[result.length - 1] = result[result.length - 1] + c
        }
        break
      default:
        result[result.length - 1] = result[result.length - 1] + c
        break
    }
  }

  return result
}

export { extractDelimValue, extractFixedValue }
