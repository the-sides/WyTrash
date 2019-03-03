//Import mongo
var mongo = require('./mongo');
// Imports the Google Cloud client library
var {Storage} = require('@google-cloud/storage');

// Creates a client
var storage = new Storage({
  projectId: "wytrash"
});

const bucket = storage.bucket('whyismytrashstillhere.com');

function getPublicUrl (filename) {
  return 'https://storage.googleapis.com/whyismytrashstillhere.com/'+filename;
}


function uploadFile(req, res, next) {
 
  //Check if the file array contains files
  if (req.files.length == 0) {
    console.log('No file specified')
    res.send('No File Specified')
    return next();
  }
  data = req.body;
  
  url = getPublicUrl(req.files[0].originalname);
  mongo.insertTrashReport(url, data.complaint, data.latitude, data.longitude, Date.now());
  //create a filename to store onto the server
  var gcsname = req.files[0].originalname;
  var file = bucket.file(gcsname);

  //write data to gcloud storage
  var stream = file.createWriteStream({
    metadata: {
      contentType: req.files[0].mimetype
    },
    resumable: false
  });

  stream.on('error', (err) => {
    req.files[0].cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.files[0].cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.files[0].cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.files[0].buffer);

  res.send("success/fail");
}

//Multer is a file object parser attached to the req object
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb
  }
});


module.exports = {
  uploadFile,
  multer
}



