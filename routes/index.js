var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WyTrash', truck_status: 'On Route...' });
});

router.get('/trip-report', function(req,res){
  res.send({foo:'bar'});
})


module.exports = router;
