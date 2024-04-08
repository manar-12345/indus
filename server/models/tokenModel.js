//const pool = require('./db');

const Token = {
  getAll: async function() {
    const [rows, fields] = await pool.execute("SELECT * FROM tokens");
    return rows;
  },

  getById: async function(id) {
    const [rows, fields] = await pool.execute(
      "SELECT * FROM tokens WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  add: async function(tokenData) {
    const { user_id, v_token, r_token, l_token, created_at, expires_at } = tokenData;
    const [rows, fields] = await pool.execute(
      "INSERT INTO tokens (user_id, v_token, r_token, l_token, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, v_token, r_token, l_token, created_at, expires_at]
    );
    return rows.insertId;
  },

  delete: async function(id) {
    const [rows, fields] = await pool.execute(
      "DELETE FROM tokens WHERE id = ?",
      [id]
    );
    return rows.affectedRows > 0;
  },

  update: async function(id, tokenData) {
    const { user_id, v_token, r_token, l_token, created_at, expires_at } = tokenData;
    const [rows, fields] = await pool.execute(
      "UPDATE tokens SET user_id = ?, v_token = ?, r_token = ?, l_token = ?, created_at = ?, expires_at = ? WHERE id = ?",
      [user_id, v_token, r_token, l_token, created_at, expires_at, id]
    );
    return rows.affectedRows > 0;
  }

  // Ajoutez d'autres fonctions selon vos besoins...
};

module.exports = Token;
