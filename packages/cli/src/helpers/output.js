import chalk from 'chalk'
import forEach from 'lodash/forEach'
import pad from 'pad'

function output (msg, args = {}) {
  if (args.s || args.silent) return
  console.log(msg)
}

output.block = function outputBlock (msg, args) {
  output(['', msg, ''].join('\n'), args)
}

output.error = function outputError (msg, exit = true) {
  output(chalk.red(msg))
  if (exit) process.exit(1)
}

output.success = function outputSuccess (msg, args) {
  output(chalk.green(msg), args)
}

output.accent = function outputAccent (msg, args) {
  output(`${chalk.grey('>')} ${msg}`, args)
}

output.space = function outputSpace (args) {
  output('', args)
}

output.record = function outputRecord (record, args) {
  let length = 0

  // Get the maximum length
  forEach(record, (val, key) => {
    length = Math.max(key.length + 2, length)
  })

  forEach(record, (val, key) => {
    const name = `${key}:`
    output(`${pad(name, length)}${val}`, args)
  })
}

export default output
