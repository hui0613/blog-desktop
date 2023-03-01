
import type { DewHook } from './DewHook'

export type BlogHook = {
  create: DewHook,
  update: DewHook
}
export interface ExtensionContext {
  hooks: BlogHook
}