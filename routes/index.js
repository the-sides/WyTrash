var express = require('express');
var router = express.Router();
var mdb = require('../api/mongo')

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'WyTrash', truck_status: 'On Route...' });

  ////
  //  If you want the light image then change logo to:
  //  /images/ww-noperiod-handshake.png
  //  Change style to ''
  ////
  let logo = '/images/ww-noperiod-handshake-dark.png';
  let style = 'background-color: rgb(33, 33, 33);'
  res.render('indexv2', { title: 'WyTrash', truck_status: 'On Route...', logo: logo, style: style });
});

// Request data from DB
var payload = {positions:[{lat:35.963733, lng:-83.917751},{lat: 35.9606384, lng: -83.9207392}]};
router.get('/trip-report', mdb.getTrashReports, function(req,res){
  console.log(req.trashReports)
  res.send(req.trashReports);
})

router.get('/test-upload', function(req, res){
  res.render('upload', { title: "meh"})
})


module.exports = router;
