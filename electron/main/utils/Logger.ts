import * as log from 'electron-log'
const chalk = require('chalk')
chalk.level = 2
chalk.enable = true

const consoleLog = console.log
class InnerLog {
  static info(logStr: any) {
    consoleLog(logStr)
  }

  static warn(logStr: string) {
    consoleLog(chalk.yellow(logStr))
  }

  static error(...args: any[]) {
    consoleLog(chalk.red(...args))
  }
}

export default class Logger {
  private static logger = process.env.NODE_ENV === 'development' ? InnerLog : log
  public static info(logStr: string) {
    Logger.logger.info(logStr)
  }

  public static warn(logStr: string) {
    Logger.logger.warn(logStr)
  }

  public static error(...args: any[]) {
    Logger.logger.error(...args)
  }

  public static log(...arg: any[]) {
    Logger.logger.info(arg)
  }
}

export function overrideConsole() {
  console.info = Logger.info
  console.error = Logger.error
  console.warn = Logger.warn
  console.log = Logger.log
}
