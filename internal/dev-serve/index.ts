import { ChildProcess, spawn } from 'child_process'
import path from 'path'
import { debounce } from 'lodash'
import * as fse from 'fs-extra'
import { projRoot } from './../built-utils/src/path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const electron = require('electron')

let electronProcess: ChildProcess | null = null

process.env.NODE_ENV = 'development'

const startMain = () => {
  const entry = path.resolve(projRoot, 'out/main')

  fse.watch(
    entry,
    {
      recursive: true,
    },
    debounce(() => {
      if (electronProcess) {
        process.kill(electronProcess.pid!)
        electronProcess = null
      }
      startElectron()
    }, 600)
  )
  if (!electronProcess) {
    startElectron()
  }
}

const startElectron = () => {
  const entry = path.resolve(projRoot, 'out/main/main.js')
  electronProcess = spawn(electron, [entry], { stdio: 'inherit' })
}

startMain()
