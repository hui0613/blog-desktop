import { DewParallelHook } from '@main/main/tapable'

export const createApiFactoryAndRegisterActors = (() => {
  return function () {
    return {
      onCreate: new DewParallelHook(),
      onUpdate: new DewParallelHook
    }
  }
})()
