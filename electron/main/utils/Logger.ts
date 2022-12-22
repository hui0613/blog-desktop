import * as log from 'electron-log'
import chalk from 'chalk'

class InnerLog {
  static info(logStr: string) {
    console.log(log)
  }

  static warn(logStr: string) {
    console.log(chalk.yellow(logStr))
  }

  static error(logStr: string) {
    console.log(chalk.red(logStr))
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

  public static error(logStr: string) {
    Logger.logger.error(logStr)
  }
}
