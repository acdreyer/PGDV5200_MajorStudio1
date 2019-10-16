/*

Script to populate data set with image file names as intermediary step from MET CVS
to dataset that can be used in the Viz. These filenames and urls are then used
to download the images as well.

Code constructs .json data file from API requests
Uses .json input file from MET open access .csv to do API requests and write a 
new customized data file.
 */

// load a default library that lets us read/write to the file system
var fs = require('fs');


// load a default library that lets us make HTTP requests (like calls to an API)
var request = require('request');
var async = require('async');




// Define endpoint URL and initialize variables
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'
var metdatalist = '../data/metArmsFromR_CSV.json';
var fnamewrite = 'metArmsFromAPI.json'
fs.writeFileSync('./' + fnamewrite, '[', 'utf8');


// Load the list with data that is needed; this list was prepared using R from the MET open access .csv file
// This might be a cumbersome way to do it, but is done since the MET csv did not include the image urls...
var obj;
var myObjectIds = [];
try {
    obj = JSON.parse(fs.readFileSync(metdatalist, 'utf8'));
    for (let i = 0; i < obj.length; i++) {
        //   for (let i =0; i< 5; i++){
        // console.log(obj[i]["Object.ID"])
        myObjectIds.push(obj[i]["Object.ID"])
    };
}
catch (err) { console.log(err) }

// console.log(myObjectIds);



// object Ids I want to download
// const myObjectIds = [
//   22029,
//  26841,
// //  26590,
// //  22293,
// //  22843,
// //  22847,
// //  22996,
// //  22997,
// //  23040
// ]


var maxsize = myObjectIds.length;   //to check end of id's

// set up empty Array for us to save results to
const myArray = []



// fetch objects; Some of the async code is courtesy of Neil Oliver

async.eachSeries(myObjectIds, function(value, callback) {

    let apiRequest = url + value;
    console.log("API request " + apiRequest);

    request(apiRequest, function(err, resp, body) {
        if (err) { fs.appendFileSync('METerrors.json', JSON.stringify(value + ',')); }
        else {
            var obj = JSON.parse(body);
            console.log(obj);


            let index = myArray.length;
            newobj = {};
            newobj["objectID"] = obj.objectID;
            newobj["objectName"] = obj.objectName;
            newobj["culture"] = obj.culture;
            newobj["objectBeginDate"] = obj.objectBeginDate;
            newobj["objectEndDate"] = obj.objectEndDate;
            newobj["dateAvg"] = 0.5 * (parseInt(obj.objectBeginDate, 10) + parseInt(obj.objectEndDate, 10));
            newobj["medium"] = obj.medium;
            newobj["dimensions"] = obj.dimensions;
            
            //do classification grouping cleanup
            if (obj.classification.search("Armor") >= 1) {
                newobj["affiliation"] = 'armor';
            }
            else if (obj.classification.search("Firearms") >= 1) {
                newobj["affiliation"] = 'gun';
            }
            else if (obj.classification.search("Helmets") >= 1) {
                newobj["affiliation"] = 'helmet';
            }
            else if (obj.classification.search("Shafted Weapons") >= 1) {
                newobj["affiliation"] = 'staffwpn';
            }
            else if (obj.classification.search("Swords") >= 1) {
                newobj["affiliation"] = 'sword';
            }
            else {
                newobj["affiliation"] = 'other';
            }
            newobj["objectURL"] = obj.objectURL;
            newobj["primaryImage"] = obj.primaryImage;
            newobj["filename"] = obj.primaryImage.split('/').pop();
            newobj["primaryImageSmall"] = obj.primaryImageSmall;
            newobj["fnImageSmall"] = obj.primaryImageSmall.split('/').pop();
            newobj["additionalImages"] = obj.additionalImages;


            fs.appendFileSync('./' + fnamewrite, JSON.stringify(newobj));
            if (myObjectIds[maxsize] ==  obj.objectID ){
                fs.appendFileSync('./' + fnamewrite, ']');
            } else {
            fs.appendFileSync('./' + fnamewrite, ',');}
        }
    });
    setTimeout(callback, 100);
});





// fs.writeFileSync('./' + fnamewrite, '{}}', 'utf8');