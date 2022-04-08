const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Number of numbers to print in the sequence'
  })
  .option('l', {
    alias: 'list',
    type: 'boolean',
    default: false,
    describe: 'Print the result'
  })
  .check((argv, options) => {
    if( isNaN(argv.b) )
      throw 'the base has to be a number'

    return true
  })
  .argv

module.exports = argv