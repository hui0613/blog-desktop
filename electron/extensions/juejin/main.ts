


export function activate() {
  setTimeout(() => {
    try {
      console.log(require('dew-blog'))
    } catch (err) {
      console.log(err)
    }
  }, 1000 * 2);
}
