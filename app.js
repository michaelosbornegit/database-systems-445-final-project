const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const dbUtils = require('./utils.js');

const router = express();
// router.use(bodyParser.json());
// router.use('/refresh', require('./routes/refresh-database.js'));
// serve static webpages statically
router.use(express.static('public'));

// query database endpoints
router.get('/getraces', (req, res) => {
  let db = dbUtils.newConnection();
  let options = {
    sql: 'SELECT * FROM RACE join TRACK on RACE.TrackID = TRACK.TrackID;',
    nestTables: true,
  };
  db.query(options, function(error, results, fields) {
    res.send(results);
    db.end();
  });
});

router.get('/getallcarinformation', (req, res) => {
  let db = dbUtils.newConnection();
  let options = {
    sql: 'SELECT DISTINCT * FROM car, team_car_relationship, team, car_owner_car_relationship, car_owner, manufacturer_car_relationship, manufacturer, driver_car_relationship, driver\
          WHERE car.CarID = team_car_relationship.CarID AND team.TeamID = team_car_relationship.TeamID\
          and car.CarID = manufacturer_car_relationship.CarID and manufacturer.ManufacturerID = manufacturer_car_relationship.ManufacturerID\
          and car.CarID = car_owner_car_relationship.CarID and car_owner_car_relationship.OwnerID = car_owner.OwnerID\
          and car.CarID = driver_car_relationship.CarID and driver_car_relationship.DriverID = driver.DriverID;',
    nestTables: true,
  }
  db.query(options, function(error, results, fields) {
    res.send(results);
    db.end();
  });
});



// serving webpages
// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '/pages', 'index.html'));
// });
//
// router.get('/races', (req, res) => {
//   res.sendFile(path.join(__dirname, '/pages', 'races.html'));
// });



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
