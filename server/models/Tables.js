//const db = require('./db'); // Import de  fichier de connexion à la base de données MySQL

const NewTable = {
  create: function(newData, callback) {
    db.query(
      "INSERT INTO new_table (field1, field2) VALUES (?, ?)",
      [newData.field1, newData.field2],
      callback
    );
  },

  getAll: function(callback) {
    return db.query("SELECT * FROM new_table", callback);
  },

  getById: function(id, callback) {
    return db.query("SELECT * FROM new_table WHERE id = ?", [id], callback);
  },

  update: function(id, newData, callback) {
    return db.query(
      "UPDATE new_table SET field1 = ?, field2 = ? WHERE id = ?",
      [newData.field1, newData.field2, id],
      callback
    );
  },

  delete: function(id, callback) {
    return db.query("DELETE FROM new_table WHERE id = ?", [id], callback);
  }
};

module.exports = NewTable;
