import { Emitter } from '@main/main/utils'
import { session } from 'electron'
import type { CookiesGetFilter, Cookie } from 'electron'

export const create = new Emitter<any>()

export const update = new Emitter<any>()

export const createApiFactoryAndRegisterActors = (() => {
  const getCookie = (filter: CookiesGetFilter): Promise<Cookie[]> => {
    return session.defaultSession.cookies.get(filter)
  }
  return function () {
    return {
      onCreate: create.event,
      onUpdate: update.event,
      getCookie
    }
  }
})()
