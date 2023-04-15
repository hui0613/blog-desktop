import { SvcService } from './../../utils/svc/svc'
import { Emitter } from '../../utils'
import { session } from 'electron'
import type { CookiesGetFilter, Cookie } from 'electron'
import { container } from 'tsyringe'

export const create = new Emitter<any>()

export const update = new Emitter<any>()

export const createApiFactoryAndRegisterActors = (() => {
  const getCookie = (filter: CookiesGetFilter): Promise<Cookie[]> => {
    return container.resolve(SvcService).execSvc('getCookies') as Promise<any>
  }
  return function () {
    return {
      onCreate: create.event,
      onUpdate: update.event,
      getCookie,
    }
  }
})()

container.register('blog:createHook', { useValue: create }).register('blog:updateHook', { useValue: update })
