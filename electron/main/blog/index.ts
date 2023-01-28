import { DewParallelHook } from './../tapable/index';
export class BlogHelper {
  private hooks

  constructor() {
    this.hooks = {
      create: new DewParallelHook(),
      update: new DewParallelHook()
    }
  }

  public startPlugin() {

  }
}