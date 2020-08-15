const shell = require('shelljs')
const output = require('./output')

/**
 * Clone the given service's repo
 *
 * @param name The name of the service
 * @param config The repo config object
 */
const clone = (name, config) => {
  const cfg = config.services[name]

  // Check that git exists. Print error if it doesn't
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git')
    shell.exit(1)
  }

  // Print message and clone repo
  // shell.echo(`We are cloning the ${cfg.repo} repo`)
  output.headerLine(true)
  shell.exec(`git clone ${cfg.repo} ${config.paths.repos}/${name}`)
  output.headerLine()
}

/**
 * Perform a git pull on the given repo
 *
 * @param name The name of the service
 * @param config The configuration
 */
const pull = (name, config) => {
  const cfg = config.services[name]
  const origin = cfg.remote ? cfg.remote : 'origin'

  // Check that git exists. Print error if it doesn't
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git')
    shell.exit(1)
  }

  // Print message and clone repo
  // shell.echo(`We are pulling the ${cfg.repo} repo`)
  output.headerLine(true)
  shell.exec(`cd ${config.paths.repos}/${name} && git pull ${origin} HEAD`)
  output.headerLine()
}

module.exports = {
  clone,
  pull
}
