const mongoose = require('mongoose');
const con = require('./mongo-key.json');


function connect(){
    mongoose.connect(con.key);
}

var Schema = mongoose.Schema;

var trashReportSchema = new Schema({
    imgName: String,
    complaint: String,
    lat: Number,
    long: Number,
    time: Date,
});

var trashReport = mongoose.model("trashReport", trashReportSchema);

function insertImage(img, complaint, latitude, longitude, now){
    var newReport = new trashReport({
        imgName: img,
        complaint: complaint,
        lat: latitude,
        long: longitude,
        time: now
    });
    newReport.save(function(error){
        if(error){
            console.log(error);
        }
        console.log("Entry Saved");
    });
}

function getTrashReport(){
    
}
module.exports = {
    connect,
}


