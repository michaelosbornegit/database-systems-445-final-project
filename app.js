const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

const connection = mysql.createConnection({
  host: process.env.CLEARDB_URL,
  user: process.env.CLEARDB_USER,
  password: process.env.CLEARDB_PASSWORD,
  database: process.env.CLEARDB_DATABASE,
});
connection.connect();


app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname + '/pages/index.html'));
  connection.query('SELECT * FROM DRIVER', function(error, results, fields) {
    res.send(results);
  });
});

/*
 * Heroku will assign a port you can use via the 'PORT' environment variable
 * To accesss an environment variable, use process.env.<ENV>
 * If there isn't an environment variable, process.env.PORT will be null (or undefined)
 * If a value is 'falsy', i.e. null or undefined, javascript will evaluate the rest of the 'or'
 * In this case, we assign the port to be 5000 if the PORT variable isn't set
 * You can consider 'let port = process.env.PORT || 5000' to be equivalent to:
 * let port; = process.env.PORT;
 * if(port == null) {port = 5000}
 */
app.listen(process.env.PORT || 5000, () => {
  console.log("Server up and running on port: " + (process.env.PORT || 5000));
});
