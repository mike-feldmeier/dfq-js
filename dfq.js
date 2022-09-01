#!/usr/bin/env node

import { Argument, program } from 'commander'
import fsp from 'fs/promises'

const self = JSON.parse(await fsp.readFile('./package.json'))

import { count } from './commands/count.js'
import { sample } from './commands/sample.js'
import { distinctDelim, distinctFixed } from './commands/distinct.js'
import { filterDelim, filterFixed } from './commands/filter.js'

program
  .name(self.name)
  .description(self.description)
  .version(self.version)

program
  .command('count')
  .argument('<source>', 'Source file to read')
  .description('Counts the number of rows in the given source file')
  .action(async (source) => { console.log(await count(source)) })

program
  .command('sample')
  .argument('<source>', 'Source file to read')
  .description('Returns a sample of rows from the given source file')
  .option('--offset <n>', 'Begins reading at the given line number', 0)
  .option('--length <n>', 'Returns the given number of rows', 10)
  .action(async (source, options) => { console.log((await sample(source, options.offset, options.length)).join('\n')) })

program
  .command('distinct')
  .addArgument(new Argument('<type>', 'Type of file').choices(['delim', 'fixed']))
  .argument('<source>', 'Source file to read')
  .description('Output a list of distinct values in the given position')
  .option('--begin <n>')
  .option('--end <n>')
  .option('--index <n>')
  .option('--delimiter <string>', 'The delimiter to use for separating values', ',')
  .option('--qualifier <string>', 'The qualifier to use for containing values', '"')
  .action(async (type, source, options) => {
    switch(type) {
      case 'delim':
        console.log((await distinctDelim(source, options.index, options.delimiter, options.qualifier)).join('\n'))
        break
      case 'fixed':
        console.log((await distinctFixed(source, options.begin, options.end)).join('\n'))
        break
      default:
        throw new Error(`Unknown type "${type}" given`)
    }
  })

program
  .command('filter')
  .addArgument(new Argument('<type>', 'Type of file').choices(['delim', 'fixed']))
  .argument('<source>', 'Source file to read')
  .description('Output only rows that match the given criterion')
  .option('--key <string>')
  .option('--begin <n>')
  .option('--end <n>')
  .option('--index <n>')
  .option('--delimiter <string>', 'The delimiter to use for separating values', ',')
  .option('--qualifier <string>', 'The qualifier to use for containing values', '"')
  .action(async (type, source, options) => { 
    switch(type) {
      case 'delim':
        console.log((await filterDelim(source, options.key, options.index, options.delimiter, options.qualifier)).join('\n'))
        break
      case 'fixed':
        console.log((await filterFixed(source, options.key, options.begin, options.end)).join('\n'))
        break
      default:
        throw new Error(`Unknown type "${type}" given`)
    }
  })

program.parse()
