const unrollTo = (lines, fn) => lines.forEach(line => fn(line))

const coalesce = (...args) => args.find(arg => !!arg)

export { unrollTo, coalesce }
