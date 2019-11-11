/*
This script populates the final dataset that will be used in d3 visualization.
 */

// npm i node-fetch --save
// ------------------------------------------------------

// load a default libraries
const fs = require('fs');
var async = require('async');
var d3 = require("d3");
var data1;
var data2;

// Specify filenames
var fnamewrite = './data/aerophVizData.json'
var fnameread1 = './data/aerophonesForTreeR.json'
var fnameread2 = './data/metaerophFromAPI.json'

// Initialize variables
var obj = {};


try {
     data1 = JSON.parse(fs.readFileSync(fnameread1, 'utf8'));
    // console.log("First data \n" + data1);    
     data2 = JSON.parse(fs.readFileSync(fnameread2, 'utf8'));
    // console.log("Second data \n" + data2);   
} catch(e) {
    console.log('Error:', e.stack);
}
finally{
    
// reconstruct object again from csv and MET API data
    data1.forEach(function(val1,ind1){
         data2.forEach( function(val2,ind2) {     
             if ( val1["Object.ID"] == val2["objectID"] )
            //  console.log("Data1: " + val1["Object.ID"] + " Data2: " +   val2["objectID"]  )
             obj.level1 = val1.level;
             obj.level2 = val1.level2;
             obj.level3 = val1.level3;
             obj.name = val1.Names;
             obj.material = val1.Material;
             obj.country = val1.Country;
             obj.materials = val2.medium;
             obj.objectURL = val2.objectURL;
             obj.fullname = val2.objectName;
             obj.filename = val2.fnImageSmall;
         })
    });

console.log(obj)
    
}


/*
// Load the MET data in order to create the scene grouping list
try {
//     obj = JSON.parse(fs.readFileSync(datalist, 'utf8'));
//     for (let i = 0; i < obj.length; i++) {
//         //   for (let i =0; i< 5; i++){
//         // console.log(obj[i]["objectID"])
//         myObjectIds.push(obj[i]["objectID"])
//     };

}
// ---------------------------------------------------------
catch (err) { console.log(err) }
// ---------------------------------------------------------
finally {





    // console.log(finaldata.scnimages[5]);

    fs.writeFileSync(fnamewrite, JSON.stringify(finaldata), null, "\n");

}*/