/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process')
const path = require('path')
const gulp = require('gulp')
const shell = require('shelljs')
const fs = require('fs')
const { debounce } = require('lodash')

const electron = require('electron')

let electronProcess = null

process.env.NODE_ENV = 'development'

function startMain() {
  const entry = path.resolve(__dirname, '../out/main')
  fs.watch(
    entry,
    debounce(() => {
      console.log('dddddd')
      if (electronProcess && electronProcess.kill) {
        process.kill(electronProcess.pid)
        electronProcess = null
      }
      startElectron()
    }, 500)
  )
  if (!electronProcess) {
    startElectron()
  }
}

function startElectron() {
  const entry = path.resolve(__dirname, '../out/main/main.js')
  electronProcess = spawn(electron, [entry])
  electronProcess.stdout.on('data', (chunk) => {
    console.log(chunk.toString())
  })

  electronProcess.stdin.on('data', (err) => {
    console.log(err.toString())
  })
}

startMain()
