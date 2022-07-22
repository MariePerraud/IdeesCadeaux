const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  static table = "user";

  find(id) {
    return this.connection.query(
      `select * from  ${this.table} where userID = ?`,
      [id]
    );
  }

  insert(item) {
    return this.connection.query(
      `insert into ${UserManager.table} (userName) values (?)`,
      [item.userName]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where userID = ?`, [
      id,
    ]);
  }
}

module.exports = UserManager;
