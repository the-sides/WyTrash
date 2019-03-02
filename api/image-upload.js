// Imports the Google Cloud client library
var {Storage} = require('@google-cloud/storage');

// Creates a client
var storage = new Storage({
  projectId: "wytrash"
});

const bucket = storage.bucket('whyismytrashstillhere.com');



function uploadFile(req, res, next) {
  if (!req.file) {
    res.send('No File Specified')
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    },
    resumable: false
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);

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



