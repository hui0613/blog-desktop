export function createArticle(article: any) {
  window.electronAPI.createArticle(article)
}

export function updateArticle(article: any) {
  window.electronAPI.updateArticle(article)
}

export function publishArticle(article: any) {
  window.electronAPI.publishArticle(article)
}

export function restartProcess() {
  window.electronAPI.restartProcess(null)
}
