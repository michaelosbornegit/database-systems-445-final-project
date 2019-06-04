const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./utils.js').db;

const router = express();
// router.use(bodyParser.json());
router.use('/refresh', require('./routes/refresh-database.js'));

// query database endpoints
router.get('/getraces', (req, res) => {
  db.query('SELECT * FROM DRIVER', function(error, results, fields) {
    res.send(results);
  });
});



// serving webpages
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/pages/index.html'));
});

router.get('/races', (req, res) => {
  res.sendFile(path.join(__dirname + '/pages/races.html'));
});



// router.get('/refresh', (req, res) => {
//
// })

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
router.listen(process.env.PORT || 5000, () => {
  console.log("Server up and running on port: " + (process.env.PORT || 5000));
});
