process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST_ELECTRON, '../public')



import { app } from 'electron'
import { release } from 'os'
import { join } from 'path'
import { registerAppEvent } from './lifeCycle'
import { overrideConsole } from './utils/Logger'
import { registerIpcInvoke } from './ipc'


// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}
overrideConsole()
registerIpcInvoke()
registerAppEvent()
