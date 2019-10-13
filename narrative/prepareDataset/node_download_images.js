
// This code is modified from the class lab example to download small versions
// of the MET objects primary images. Since it is done syncronously without a timeout
// the dataset is broken up into manageable chunks to keep the MET server from
// kicking us out. This isn't very elegant but for now at least it works... 
// In future I need to write async function with timeout of 100ms.


// load a default library that lets us read/write to the file system
let fs = require('fs');
// load a default library that lets us make HTTP requests (like calls to an API)
let request = require('request');

// the folder we will write into
let folder = "downloads";

// download the image by url, name the file by filename
function downloadImage(uri, filename, callback){
  request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream( folder + "/" + filename)).on('close', callback);
  });
};

// go through the json we created before
function downloadData() {
  fs.readFile("./data/data_k.json", "utf8", (err, data) => { //modify this part of the code for each datafile
  // fs.readFile("dataex2.json", "utf8", (err, data) => {
    if (err) console.log(err);

    JSON.parse(data).forEach(e => {
      console.log('Downloading ' + e.fnImageSmall);
      downloadImage(e.primaryImageSmall, e.fnImageSmall, function(err,res,callback){
        if (err){console.log(err)}
        else {
        console.log('Finished Downloading ' + e.fnImageSmall);
      };
      });
    });

  });
}

downloadData();
