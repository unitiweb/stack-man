const yaml = require('js-yaml')
const fs = require('fs')
const helpers = require('./helpers')

// Get the base path the command was run in
const basePath = process.cwd()

// Default configuration
const config = {
  args: helpers.processArgs(),
  paths: {
    base: basePath,
    services: `${basePath}/services`,
    repos: `${basePath}/.repos`
  },
  services: {}
}

// Load the stack configuration
const cfg = yaml.safeLoad(fs.readFileSync(`${config.paths.base}/config.yml`, 'utf8'))
config.services = cfg.stack.services

// Load path configuration if exists
if (cfg.stack.paths) {
  // Load the repos path if one was supplied
  if (cfg.stack.paths.repos) {
    config.paths.repos = `${basePath}/${cfg.stack.paths.repos}`
  }

  // Load the services path if one was supplied
  if (cfg.stack.paths.services) {
    config.paths.services = `${basePath}/${cfg.stack.paths.services}`
  }
}

// If the args.value is all then we need to add all the services
if (config.args.values.length >= 1 && config.args.values[0].toLowerCase() === 'all') {
  config.args.values = []
  for (const name in config.services) {
    if (config.services.hasOwnProperty(name)) {
      config.args.values.push(name)
    }
  }
}

module.exports = config
