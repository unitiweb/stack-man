const repo = require('./repo')
const helper = require('./helpers')
const output = require('./output')

const okayToPull = (name, config, cb) => {
  if (config.services.hasOwnProperty(name)) {
    // Only allow a clone if a build.yml file is given for that service
    if (config.services[name].hasOwnProperty('build')) {
      cb(name, config)
    }
  }
}

/**
 * Handle the pull request
 *
 * @param config
 */
module.exports = (config) => {
  const lines = []

  for (let i = 0; i < config.args.values.length; i++) {
    const name = config.args.values[i];

    // If the repo doesn't exists we need to clone it
    if (!helper.directoryExists(`${config.paths.repos}/${name}`)) {
      okayToPull(name, config, () => {
        // The repo hasn't yet been cloned so we will clone it
        // Since cloning will pull the most recent version there is no need to pull afterwards
        repo.clone(name, config)
        lines.push(`Cloned repo ${name}`)
      })
    } else {
      okayToPull(name, config, () => {
        // Pull the latest for the repo
        repo.pull(name, config)
        lines.push(`Pulled repo ${name}`)
      })
    }
  }

  output.header('Running the pull command', true, true, lines)
}
