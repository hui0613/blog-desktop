'use strict';

const cookieTableName = "cookies";
async function createCookiesTable(database) {
  await database.schema.hasTable(cookieTableName).then((exist) => {
    if (exist) {
      return;
    }
    return database.schema.createTable(cookieTableName, (tableBuilder) => {
      tableBuilder.bigIncrements("id", { primaryKey: true });
      tableBuilder.string("domain");
      tableBuilder.text("cookies");
      tableBuilder.timestamp("create_time");
      tableBuilder.timestamp("update_time");
    });
  });
}

exports.cookieTableName = cookieTableName;
exports.createCookiesTable = createCookiesTable;
