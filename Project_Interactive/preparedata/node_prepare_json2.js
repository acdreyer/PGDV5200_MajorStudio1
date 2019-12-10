
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
var metdatalist = '../data/aerophonesForTreeR.json';
var fnamewrite = 'metaerophFromAPI.json'
fs.writeFileSync('./data/' + fnamewrite, '[', 'utf8');


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
finally{

console.log(myObjectIds.length);

}

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


    // "Object.ID": 500527,
    // "level": "Aerophone",
    // "level2": "Organ",
    // "level3": "Organ",
    // "Names": "Pipe Organ",
    // "Material": "Wood",
    // "Materials": "Wood | metal | various materials",
    // "Object.Name": "Pipe Organ",
    // "Link.Resource": "http://www.metmuseum.org/art/collection/search/500527"

            let index = myArray.length;
            newobj = {};
            newobj["objectID"] = obj.objectID;
            newobj["objectName"] = obj.objectName;
            newobj["medium"] = obj.medium;
            newobj["dimensions"] = obj.dimensions;
            newobj["classification"] = obj.classification;
            newobj["objectURL"] = obj.objectURL;
            newobj["primaryImage"] = obj.primaryImage;
            newobj["filename"] = obj.primaryImage.split('/').pop();
            newobj["primaryImageSmall"] = obj.primaryImageSmall;
            newobj["fnImageSmall"] = obj.primaryImageSmall.split('/').pop();


            fs.appendFileSync('./data/' + fnamewrite, JSON.stringify(newobj));
            if (myObjectIds[maxsize] ==  obj.objectID ){
                fs.appendFileSync('./data/' + fnamewrite, ']');
            } else {
            fs.appendFileSync('./data/' + fnamewrite, ',');}
        }
    });
    setTimeout(callback, 100);
});





// fs.writeFileSync('./data/' + fnamewrite, '{}}', 'utf8');


// { objectID: 631124,
//   isHighlight: false,
//   accessionNumber: '2014.18',
//   isPublicDomain: true,
//   primaryImage:
//   'https://images.metmuseum.org/CRDImages/mi/original/DP340077.jpg',
//   primaryImageSmall:
//   'https://images.metmuseum.org/CRDImages/mi/web-large/DP340077.jpg',
//   additionalImages:
//   [ 'https://images.metmuseum.org/CRDImages/mi/original/DP346447.jpg' ],
//   constituents: [ { role: 'Maker', name: 'attr. C.W. Moritz' } ],
//   department: 'Musical Instruments',
//   objectName: 'Tuba',
//   title: 'Tuba',
//   culture: 'German',
//   period: '',
//   dynasty: '',
//   reign: '',
//   portfolio: '',
//   artistRole: 'Maker',
//   artistPrefix: 'attr.',
//   artistDisplayName: 'C.W. Moritz',
//   artistDisplayBio: '',
//   artistSuffix: '',
//   artistAlphaSort: 'Moritz C.W.',
//   artistNationality: '',
//   artistBeginDate: '',
//   artistEndDate: '',
//   objectDate: 'ca. 1855',
//   objectBeginDate: 1850,
//   objectEndDate: 1860,
//   medium: 'Brass',
//   dimensions:
//   '31 1/2 × 8 × 16 in., 7.9 lb. (80 × 20.3 × 40.6 cm, 3583.416g)',
//   creditLine: 'Purchase, Robert Alonzo Lehman Bequest, 2014',
//   geographyType: '',
//   city: 'Berlin',
//   state: '',
//   county: '',
//   country: 'Germany',
//   region: '',
//   subregion: '',
//   locale: '',
//   locus: '',
//   excavation: '',
//   river: '',
//   classification: 'Aerophone-Lip Vibrated',
//   rightsAndReproduction: '',
//   linkResource: '',
//   metadataDate: '2019-07-26T03:00:41.71Z',
//   repository: 'Metropolitan Museum of Art, New York, NY',
//   objectURL: 'https://www.metmuseum.org/art/collection/search/631124',
//   tags: [] }