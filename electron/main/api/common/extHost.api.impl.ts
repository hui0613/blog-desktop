import { Emitter } from '@main/main/utils'

export const create = new Emitter<any>()

export const update = new Emitter<any>()

export const createApiFactoryAndRegisterActors = (() => {
  return function () {
    return {
      onCreate: create.event,
      onUpdate: update.event
    }
  }
})()
