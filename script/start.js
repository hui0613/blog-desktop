/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process')
const path = require('path')
const gulp = require('gulp')
const shell = require('shelljs')
const fs = require('fs')
const fse = require('fs-extra')
const { debounce } = require('lodash')

const electron = require('electron')

let electronProcess = null

process.env.NODE_ENV = 'development'

function startMain() {
  const entry = path.resolve(__dirname, '../out/main')

  fse.watch(
    entry,
    {
      recursive: true,
    },
    debounce(() => {
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
  electronProcess = spawn(electron, [entry], { stdio: 'inherit' })
}

startMain()
