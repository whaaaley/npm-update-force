#!/usr/bin/env node

const child_process = require('child_process')
const fs = require('fs')
const path = require('path')
const color = require('./color')

const data = JSON.parse(fs.readFileSync(path.resolve('package.json')))

const deps = {
  'npm i': data.dependencies,
  '; npm i -D': data.devDependencies,
  '; npm i -O': data.optionalDependencies
}

let cmd = ''

for (const key in deps) {
  const group = deps[key]

  cmd += key

  if (group) {
    for (const name in group) {
      cmd += ' ' + name + '@latest'
    }
  }
}

console.log(
  color('blue', '\n[npm-update-force]'),
  color('green', 'Updating...'),
  color('white', cmd + '\n')
)

child_process.exec(cmd, { maxBuffer: Infinity }, () => {
  console.log(
    color('blue', '\n[npm-update-force]'),
    color('green', 'Done!\n')
  )
}).stdout.pipe(process.stdout)
