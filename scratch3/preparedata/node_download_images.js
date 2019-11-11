// This code is modified from the class lab example to download small versions
// of the MET objects primary images. 
// In future I need to write async function with timeout of 100ms.


// load a default library that lets us read/write to the file system
let fs = require('fs');
var async = require('async')
// load a default library that lets us make HTTP requests (like calls to an API)
let request = require('request');

// the folder we will write into
let folder = "downloads";

// download the image by url, name the file by filename
function downloadImage(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream(folder + "/" + filename)).on('close', callback);
  });
};

// go through the json we created before
// function downloadData() {





try {
  var data = JSON.parse(fs.readFileSync("./data/metaerophFromAPI.json", "utf8"));
 console.log(data)

}
catch (err) { console.log(err) }
finally {


    async.eachSeries(data, function(e, callback) {
      console.log('Downloading ' + e.fnImageSmall);
      downloadImage(e.primaryImageSmall, e.fnImageSmall, function(err, res, callback) {
        if (err) { console.log(err) }
        else {
          console.log('Finished Downloading ' + e.fnImageSmall);
        };
        // setTimeout(callback, 200)
      });

      setTimeout(callback, 200)
    }); //eachseries

} //finally




// downloadData();
