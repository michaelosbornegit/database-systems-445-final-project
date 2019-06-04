const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.CLEARDB_URL,
  user: process.env.CLEARDB_USER,
  password: process.env.CLEARDB_PASSWORD,
  database: process.env.CLEARDB_DATABASE,
});

module.exports = {
  db: db,
};
