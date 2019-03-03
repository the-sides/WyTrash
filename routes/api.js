// Import Express, setup router
var express = require('express');
var router = express.Router();

var api = require('./../api/image-upload');
var mgo = require('./../api/mongo');


router.post('/image-upload', api.multer.any(), api.uploadFile);


module.exports = router;