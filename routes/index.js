var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WyTrash', truck_status: 'On Route...' });
});

// Request data from DB
payload = {positions:[{lat:35.963733, lng:-83.917751},{lat: 35.9606384, lng: -83.9207392}]};
router.get('/trip-report', function(req,res){
  res.send(payload);
})

module.exports = router;
