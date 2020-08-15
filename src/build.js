const yaml = require('js-yaml')
const fs = require('fs')
const repo = require('./repo')
const helpers = require('./helpers')

// The docker-compose.yml object
const compose = {}

module.exports = (config) => {
  // Add the defaults to the compose file
  compose.version = '3.5'
  compose.services = {}

  for (const name in config.services) {
    if (config.services.hasOwnProperty(name)) {
      const service = config.services[name]

      let composeFile = '';
      if (config.args.values.includes(name)) {
        if (!helpers.directoryExists(`${config.paths.repos}/${name}`)) {
          repo.clone(name, config)
        }
        composeFile = service.build
      } else {
        composeFile = service.image
      }

      // Get the proper docker-compose file (build.yml or image.yml)
      const composeConfig = yaml.safeLoad(fs.readFileSync(`${config.paths.services}/${name}/${composeFile}`, 'utf8'))

      // Make sure the services.yml file exists. If it does then load it
      if (helpers.directoryExists(`${config.paths.services}/${name}/service.yml`)) {
        const configYml = yaml.safeLoad(fs.readFileSync(`${config.paths.services}/${name}/service.yml`, 'utf8'))
        // Merge the config.yml and build.yml or image.yml
        composeConfig.services[name] = {...composeConfig.services[name], ...configYml.services[name]}
      }

      // Add the configured service to the compose file
      compose.services[name] = composeConfig.services[name]
    }
  }

  // Add the network configuration
  compose.networks = {
    overlay: null
  }

  // Save the new docker-compose.yml file
  fs.writeFileSync(`${config.paths.base}/docker-compose.yml`, yaml.safeDump(compose))
}
