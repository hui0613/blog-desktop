export {} /// 这句不能删
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    openLoginPage: (...rest) => Promise<any>
  }
}
