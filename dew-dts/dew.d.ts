declare module 'dew-blog' {
  export const onCreate: {
    tapAsync: any,
    tapPromise: any
  }
  export const onUpdate: {
    tapAsync: any,
    tapPromise: any
  }

  export const getCookie: (args: any) => Promise<any>
}
