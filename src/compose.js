const shell = require('shelljs')
const output = require('./output')

const getService = (config) => {
  let service = '';
  if (Array.isArray(config.args.values) && config.args.values.length >= 1) {
    service = config.args.values[0] || ''
  }
  return service
}

/**
 * Spin up the docker-compose stack
 */
const up = () => {
  output.execute(
    'Spinning Up Stack',
    'docker-compose up -d'
  )
}

const down = () => {
  output.execute(
    'Shutting Down Stack',
    'docker-compose down'
  )
}

const ps = () => {
  output.execute(
    'Show Stack Processes',
    'docker-compose ps'
  )
}

const logs = (config) => {
  let service = getService(config);
  output.execute(
    `Showing logs for ${service}`,
    `docker-compose logs -f ${service}`
  )
}

const ssh = (config) => {
  let service = getService(config);
  output.execute(
    'Open ssh connection to container',
    `docker-compose exec ${service} bash`
  )
}

const stopAll = () => {
  output.execute(
    'Stop all Docker Containers (not just this stack)',
    'docker stop $(docker ps -aq)'
  )
}

const rmAll = () => {
  output.execute(
    'Remove all Docker Containers (not just this stack)',
    'docker rm $(docker ps -aq)'
  )
}

const rmiAll = () => {
  output.execute(
    'Remove all Docker images (not just this stack)',
    'docker rmi $(docker images -aq)'
  )
}

module.exports = {
  up,
  down,
  ps,
  logs,
  ssh,
  stopAll,
  rmAll,
  rmiAll
}
