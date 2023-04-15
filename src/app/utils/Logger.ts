import * as log from 'electron-log'

const consoleLog = console.log
class InnerLog {
  static info(...args: any[]) {
    consoleLog(...args)
  }

  static warn(logStr: string) {
    consoleLog(logStr)
  }

  static error(...args: any[]) {
    consoleLog(...args)
  }
}

export default class Logger {
  private static logger = process.env.NODE_ENV === 'development' ? InnerLog : log
  public static info(...args: any[]) {
    Logger.logger.info(...args)
  }

  public static warn(logStr: string) {
    Logger.logger.warn(logStr)
  }

  public static error(...args: any[]) {
    Logger.logger.error(...args)
  }

  public static log(...arg: any[]) {
    Logger.logger.info(...arg)
  }
}

export function overrideConsole() {
  console.info = Logger.info
  console.error = Logger.error
  console.warn = Logger.warn
  console.log = Logger.log
}
