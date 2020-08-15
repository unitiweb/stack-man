'use strict'

require('dotenv').config()
const { PHPMYADMIN_EXTERNAL_PORT } = process.env

const { spawn } = require('child_process')
const args = process.argv
const command = args[2] ? args[2].toLowerCase() : '';

let message = null

if (!command) {
  message = 'You must enter a recognized command'
}

if (command === 'db:admin') {
  spawn('open', [`http://127.0.0.1:${PHPMYADMIN_EXTERNAL_PORT}`])
  message = 'PhpMyAdmin has been opened'
}

if (message) {
  console.log('|--------------------------------------------------')
  console.log(`| ${message}`)
  console.log('|--------------------------------------------------')
}
