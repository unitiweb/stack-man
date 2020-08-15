const fs = require('fs')

/**
 * Process and return the command arguments
 *
 * @returns {{command: string, values: []}}
 */
const processArgs = () => {
  const args = process.argv

  // Remove the first two args. They are not needed or wanted
  if (args.length >= 3) {
    args.shift()
    args.shift()
  }

  // Re-Format the args
  const cfg = {
    command: args[0].toLowerCase(),
    values: []
  }

  // Remove the command from the args
  args.shift()

  if (Array.isArray(args)) {
    if (args.length >= 1) {
      args.forEach(arg => cfg.values.push(arg))
    }
  }

  return cfg
}

/**
 * Check to see if the given directory exists
 *
 * @returns {boolean}
 */
const directoryExists = (directory) => {
  try {
    fs.statSync(directory);
    return true
  } catch (err) {
    return false
  }
}

module.exports = {
  processArgs,
  directoryExists
}
