// This program hosts a nodejs webserver using express for a nascar statistics
// fan app.

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const dbUtils = require('./utils.js');

const router = express();
// serve static webpages statically
router.use(express.static('public'));
router.use(bodyParser.json());

// endpoints
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

router.get('/gettracks', (req, res) => {
  let db = dbUtils.newConnection();
  let options = {
    sql: 'SELECT * FROM TRACK',
  };
  db.query(options, function(error, results, fields) {
    res.send(results);
    db.end();
  });
});

router.post('/getraceresults', (req, res) => {
  let db = dbUtils.newConnection();
  let options = {
    sql: 'SELECT DISTINCT * FROM car, `result`, team_car_relationship, team, car_owner_car_relationship, car_owner, manufacturer_car_relationship, manufacturer, driver_car_relationship, driver\
          WHERE car.CarID = team_car_relationship.CarID AND team.TeamID = team_car_relationship.TeamID\
          and car.CarID = manufacturer_car_relationship.CarID and manufacturer.ManufacturerID = manufacturer_car_relationship.ManufacturerID\
          and car.CarID = car_owner_car_relationship.CarID and car_owner_car_relationship.OwnerID = car_owner.OwnerID\
          and car.CarID = driver_car_relationship.CarID and driver_car_relationship.DriverID = driver.DriverID\
          and car.CarID = `result`.CarID and `result`.RaceID="' + req.body.raceID + '"\
          ORDER BY FinishPosition ASC;',
    nestTables: true,
  };
  db.query(options, function(error, results, fields) {
    console.log(results);
    res.send(results);
    db.end();
  });
});

router.post('/postcomment', (req, res) => {
  let db = dbUtils.newConnection();
  let options = {
    sql: `INSERT INTO RACEFAN (Name, FavoriteRacer, Comments) VALUES ("` + req.body.name + '", "' + req.body.favDriver + '", "' + req.body.comment + '");',
  };
  db.query(options, function(error, results, fields) {
    res.send('success');
    db.end();
  });
});

router.get('/getcomments', (req, res) => {
  let db = dbUtils.newConnection();
  let options = {
    sql: 'SELECT * FROM RACEFAN',
  };
  db.query(options, function(error, results, fields) {
    res.send(results);
    db.end();
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
router.listen(process.env.PORT || 5000, () => {
  console.log("Server up and running on port: " + (process.env.PORT || 5000));
});
