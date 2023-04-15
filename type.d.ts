import { ChildProcess } from 'child_process'
declare namespace NodeJS {
  interface ProcessEnv {
    VITE_DEV_SERVER_URL: string
  }

  interface Process {
    _plugin_watcher?: import('chokidar').FSWatcher
    _electronProcess?: ChildProcess
  }
}
