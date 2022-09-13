export function debounce(fn: any, delay: number, callback?: (args: any) => any): (args: any) => any {
  let timer: NodeJS.Timeout | null = null
  return function (this: any, args: any) {
    if (timer) {
      clearTimeout(timer)
    }
    const arg = args
    timer = setTimeout(() => {
      const result = fn.call(this, arg)
      if (callback) {
        callback(result)
      }
    }, delay)
  }
}
