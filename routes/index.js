var express = require('express');
var router = express.Router();
var mdb = require('../api/mongo')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WyTrash', truck_status: 'On Route...' });
});

// Request data from DB
var payload = {positions:[{lat:35.963733, lng:-83.917751},{lat: 35.9606384, lng: -83.9207392}]};
router.get('/trip-report', mdb.getTrashReports, function(req,res){
  // mdb.insertTrashReport( "asd.jpeg", "asd_complaint", 35.9586709, -83.93520380000001, Date.now() );
  
  console.log(req.trashReports)
  /*
  console.log("++++++++++++++++++++++++++++++++++++")
  for(flag in data){
    console.log("=======================")
    console.log(flag.imgName)
  }
  */
  res.send(req.trashReports);
})

router.get('/test-upload', function(req, res){
  res.render('upload', { title: "meh"})
})


module.exports = router;
