// Imports the Google Cloud client library
var {Storage} = require('@google-cloud/storage');

// Creates a client
var storage = new Storage({
  projectId: "wytrash"
});

const bucket = storage.bucket('whyismytrashstillhere.com');

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}


function uploadFile(req, res, next) {
  console.log(req.files.length);
  if (req.files.length == 0) {
    console.log('No file specified')
    res.send('No File Specified')
    return next();
  }
  console.log(req.files[0])
  var gcsname = Date.now() + req.files[0].originalname;
  var file = bucket.file(gcsname);

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

  console.log(req.files[0])

  res.send("success/fail");
}

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



