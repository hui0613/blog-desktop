import { ChildProcess, spawn } from 'child_process'
import * as path from 'path'
const electron = require('electron')

export const dewElectron = (function () {
  let _electronProcess: ChildProcess | null = null
  const start = (mainFilePath: string) => {
    if (_electronProcess) {
      _electronProcess.kill()
      _electronProcess = null
    }

    // @ts-ignore
    process._electronProcess = _electronProcess = spawn(electron, [mainFilePath], { stdio: 'inherit' })
  }

  const stop = () => {
    if (_electronProcess) {
      _electronProcess.kill()
    }
  }

  return {
    stop,
    start,
  }
})()
