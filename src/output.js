const term = require('terminal-kit').terminal
const shell = require('shelljs')

const maxLineLength = 100

const headerLine = (topSpace = false, bottomSpace = false) => {
  if (topSpace) term("\n")
  term.green('='.repeat(maxLineLength) + "\n")
  if (bottomSpace) term("\n")
}

const headerBulletList = (list) => {
  if (Array.isArray(list)) {
    for (let i = 0; i < list.length; i++) {
      term.yellow(` -- ${list[i]}\n`);
    }
  }
}

/**
 * Create a header line
 *
 * @param text The header test
 * @param topLine Boolean to show top line
 * @param bottomLine Boolean to show bottom line
 * @param callback Callback to add addition inside lines of text
 */
const header = (text, topLine = true, bottomLine = true, callback = null) => {
  // Add a top line if neccessary
  if (topLine) headerLine(true)

  // Add the header text and mike it all uppercase
  term.green(` ${text.toUpperCase()}\n`)

  // If callback is an array then make a bullet list, otherwise assume it's a callback
  if (callback !== null) {
    if (Array.isArray(callback)) {
      term.green('-'.repeat(maxLineLength) + "\n")
      headerBulletList(callback)
    } else {
      term.green('-'.repeat(maxLineLength) + "\n")
      callback(term)
    }
  }

  // Add a bottom line if neccessary
  if (bottomLine) headerLine(false, true)
}

const text = (text) => {
  term(`${text}\n`)
}

const indent = (text, indent = ' -- ') => {
  let lines = text.split("\n")
  if (Array.isArray(lines)) {

    lines = lines.filter(line => {
      return line.trim() !== ''
    })

    lines = lines.map(line => {
      return indent + line
    })

    text = lines.join("\n")
  }

  term(text.trim())
}

const execute = (headerText, command) => {
  headerLine(true, false)
  header(headerText, false, true)
  const child = shell.exec(command, {async:true});
}

const error = (text) => {
  const line = '-'.repeat(maxLineLength)
  term.red(`\n\n${line}\n`)
  term.bold.red(` -- ${text}\n`)
  term.red(`${line}\n\n`)
  process.exit(1)
}

module.exports = {
  headerLine,
  header,
  text,
  indent,
  execute,
  error
}