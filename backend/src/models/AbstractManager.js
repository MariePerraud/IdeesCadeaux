class AbstractManager {
  constructor(connection, table) {
    this.connection = connection;
    this.table = table;
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }
}

module.exports = AbstractManager;
