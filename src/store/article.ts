import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => {
    return {
      title: '',
      mark_content: '',
      html_content: '',
      cover_image: '',
      brief_content: ''
    }
  },
  getters: {
    getArticleInfo(): Object {
      return {
        title: this.title,
        mark_content: this.mark_content,
        html_content: this.html_content,
        cover_image: this.cover_image,
        brief_content: this.brief_content

      }
    }
  },
  actions: {
    updateArticleContent(mark_content: string, html_content: string) {
      this.mark_content = mark_content
      this.html_content = html_content
    }
  }
})
