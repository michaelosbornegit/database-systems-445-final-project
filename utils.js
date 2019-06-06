// Utilities for use with backend

const mysql = require('mysql');

// create and return a reference to a new database
const newConnection = () => {
  let db = mysql.createConnection({
    host: process.env.CLEARDB_URL,
    user: process.env.CLEARDB_USER,
    password: process.env.CLEARDB_PASSWORD,
    database: process.env.CLEARDB_DATABASE,
  });
  db.connect();
  return db;
};

module.exports = {
  newConnection: newConnection,
};
