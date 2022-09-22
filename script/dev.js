/* eslint-disable @typescript-eslint/no-var-requires */
const {spawn} = require('child_process')
const path = require('path')
const gulp = require('gulp')

const electronProcess = spawn("gulp", {
  cwd: path.resolve(__dirname, '../')
})

  electronProcess.stdout.on('error', (chunk) => {
    console.log(chunk.toString())
  })

  electronProcess.stdin.on('data', (err) => {
    console.log(err.toString())
  })