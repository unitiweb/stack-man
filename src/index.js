#! /usr/bin/env node

const config = require('./config')
const compose = require('./compose')
const output = require('./output')

/**
 * Get the services we need to build
 */
if (config.args.command === 'up') {
  compose.up()
} else if (config.args.command === 'down') {
  compose.down()
} else if (config.args.command === 'ps') {
  compose.ps()
} else if (config.args.command === 'logs') {
  compose.logs(config)
} else if (config.args.command === 'ssh') {
  compose.ssh(config)
} else if (config.args.command === 'stop-all') {
  compose.stopAll()
} else if (config.args.command === 'rm-all') {
  compose.rmAll()
} else if (config.args.command === 'rmi-all') {
  compose.rmiAll()
} else if (config.args.command === 'pull') {
  require('./pull')(config)
} else if (config.args.command === 'build') {
  require('./build')(config)
} else {
  output.error(`The command "${config.args.command}" is not valid`)
}
