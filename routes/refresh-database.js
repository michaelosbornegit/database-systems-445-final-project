const express = require('express');
const request = require('request');
const db = require('./../utils.js').db;

let router = express.Router();

router.get('/', (req, res) => {
  // call the api endpoint for cars
  request('http://api.sportradar.com/nascar-ot3/mc/2019/drivers/list.json?api_key=' + process.env.SPORTSRADAR_NASCAR_API_KEY,
  function (error, response, body) {
    res.send(JSON.parse(response.body));
  });
});

module.exports = router;
