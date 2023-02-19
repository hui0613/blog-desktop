import { BlogDataBase } from '../bases'

export function createArticleTable() {

  const blogSchema = BlogDataBase.getInstance('blog').schema
  blogSchema.hasTable('article').then((exist: boolean) => {
    if (exist) {
      return
    }
    blogSchema.createTable('article', (tableBuilder) => {
      tableBuilder.bigIncrements('id', { primaryKey: true })
      tableBuilder.string('title')
      tableBuilder.text('mark_content')
      tableBuilder.text('html_content')
      tableBuilder.timestamp("create_time")
      tableBuilder.timestamp('update_time')
    })
  })
}
