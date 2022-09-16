# dfq-js
Library for querying fixed-width or delimited data files from the CLI or Node.js

## Using CLI Commands

### #install
```
> npm i -g dfq
```

### count
```count <source>```

*Counts the number of rows in the given source file*

```
> dfq count sample.txt
1024
```

### sample
```sample <source> [--offset n=0] [--length=10]```

*Returns a sample of rows in the source*

```
> dfq sample sample.txt --length 3
Line 1...
Line 2...
Line 3...
```

### distinct

```distinct fixed <source> [--begin <n=0>] [--end <n=EOL>]```

```distinct delim <source> [--index <n>] [--delimiter <s=,>] [--qualifier <s=">]```

*Output a list of distinct values in the given position*

```
> dfq distinct fixed sample.txt --begin 10 --end 15
2
3
5
11
```

### filter

```filter fixed [--key <s>] [--begin <n=0>] [--end <n=EOL>]```

```filter delim [--key <s>] [--index <n>] [--delimiter <s=,>] [--qualifier <s=">]```

*Output lines where the given key is found within the given range*

```
> dfq filter fixed sample.txt --key xyz --begin 10 --end 15
Line 1...
Line 8...
Line 9...
```

### sum

```sum fixed <source> [--begin <n=0>] [--end <n=EOL>]```

```sum delim <source> [--index <n>] [--delimiter <s=,>] [--qualifier <s=">]```

*Output the sum of values in the given position*

```
> dfq sum fixed sample.txt --begin 10 --end 15
5178.52
```

## Node.js Functions

Most, if not all, of the above functionality is available directly through Node.js.

```javascript
import { count, sample, distinctDelim, distinctFixed, filterDelim, filterFixed, sumDelim, sumFixed } from 'dfq/commands'

const length = await count(filename)
const rows = await sample(filename, offset, length)
const dinstinctValues = await distinctDelim(filename, index, delimiter, qualifier)
const dinstinctValues2 = await distinctFixed(filename, begin, end)
const matchingRows = await filterDelim(filename, key, index, delimiter, qualifier)
const matchingRows2 = await filterFixed(filename, key, begin, end)
const total = await sumDelim(filename, key, index, delimiter, qualifier)
const total2 = await sumFixed(filename, key, begin, end)
```
