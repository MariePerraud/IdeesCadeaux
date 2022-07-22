const AbstractManager = require("./AbstractManager");

class CadeauManager extends AbstractManager {
  static table = "idea";

  find(id) {
    return this.connection.query(
      `select * from  ${this.table} where ideaID = ?`,
      [id]
    );
  }

  findbyId(id) {
    return this.connection.query(
      `select ideaName from  ${this.table} join user on user.userID = idea.user_id where ideaID = ?`,
      [id]
    );
  }

  insert(item) {
    return this.connection.query(
      `insert into ${CadeauManager.table} (ideaName, user_id) values (?, ?)`,
      [item.ideaName, item.user_id]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where ideaID = ?`, [
      id,
    ]);
  }
}

module.exports = CadeauManager;
