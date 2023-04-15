'use strict';

const articleTableName = "article";
async function createArticleTable(database) {
  await database.schema.hasTable(articleTableName).then((exist) => {
    if (exist) {
      return;
    }
    return database.schema.createTable(articleTableName, (tableBuilder) => {
      tableBuilder.bigIncrements("id", { primaryKey: true });
      tableBuilder.string("title");
      tableBuilder.text("mark_content");
      tableBuilder.text("html_content");
      tableBuilder.timestamp("create_time");
      tableBuilder.timestamp("update_time");
    });
  });
}

exports.articleTableName = articleTableName;
exports.createArticleTable = createArticleTable;
