/*
This script populates the final dataset that will be used in d3 visualization.
Merges two json files; one from MET CSV structured with R and one from MET API with 
image data.
 */

// npm i node-fetch --save
// ------------------------------------------------------

// load a default libraries
const fs = require('fs');
var async = require('async');
// var p5 = require('p5')
var d3 = require("d3");
// //https://www.npmjs.com/package/underscore.nest
// var _ = require('underscore');
//  _.nst = require('underscore.nest');       // npm install underscore.nest
var data1;
var data2;

// Specify filenames
var fnamewrite = './data/aerophVizData_b.json'
var fnamewriteNest = './data/aerophVizDataNest_b.json'
var fnamewriteNestmod = './data/aerophVizDataNestmod_b.json'
var fnamewriteNestmod2 = './data/aerophVizDataNestmod2_b.json'
var fnameread1 = './data/aerophonesForTreeR_b.json'
var fnameread2 = './data/metaerophFromAPI.json'

// Initialize variables
var obj = {};
// var tempobj = {}
var objarr = [];
var count = 0;




data1 = JSON.parse(fs.readFileSync(fnameread1, 'utf8'));
// console.log("First data \n" + data1);    
data2 = JSON.parse(fs.readFileSync(fnameread2, 'utf8'));
// console.log("Second data \n" + data2);   



for (let i = 0; i < data1.length; i++) {

    for (j = 0; j < data2.length; j++) {
        if (data1[i]["Object.ID"] == data2[j]["objectID"]) {
            // count++;
            const tempobj ={};
            console.log(data1[i]["Object.ID"] + " " + data2[j]["objectID"])
            // console.log(i)
            // tempobj.level1 = val1.level;
            // tempobj.level2 = val1.level2;
            // tempobj.level3 = val1.level3;
            // tempobj.name = val1.Names;
            // tempobj.material = val1.Material;
            // tempobj.materials = val2.medium;
            // tempobj.objectURL = val2.objectURL;
            // tempobj.fullname = val2.objectName;
            // tempobj.filename = val2.fnImageSmall;
             tempobj.level1 = data1[i].level;
             tempobj.level2 = data1[i].level2;
             tempobj.level3 = data1[i].level3;
             tempobj.name = data1[i].Names;
             tempobj.material = data1[i].Material;
             tempobj.country = data1[i].Country;
            tempobj.materials = data2[j].medium;
            tempobj.objectURL = data2[j].objectURL;
            tempobj.fullname = data2[j].objectName;
            tempobj.filename = data2[j].fnImageSmall;
            console.log(tempobj)
            objarr[j]=(tempobj);
        }
    }

}


// console.log(objarr)

    // fs.writeFileSync(fnamewrite, JSON.stringify(objarr), null, "\n")


try {

var objectsNested = d3.nest()
  .key(function(d) { return d.level1; })
  .key(function(d) { return d.level2; })
  .key(function(d) { return d.level3; })
  .key(function(d) { return d.name; })
  .entries(objarr);
console.log(JSON.stringify(objectsNested));

}
catch (err) {}

finally {
console.log(objectsNested)


fs.writeFileSync(fnamewriteNest, JSON.stringify(objectsNested), null, "\n")
}
// https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs


// try {
// fs.readFile(fnamewriteNest, 'utf8', function (err,data) {
//   if (err) {
//     return console.log(err);
//   }
//   let result1 = data.replace(/"key":/g, "\"name\":");

//   fs.writeFile(fnamewriteNestmod, result1, 'utf8', function (err) {
//      if (err) return console.log(err);
//   });
// });

// }
// catch (err) {}
// finally {
    
    fs.readFile(fnamewriteNest, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let result2 = data.replace(/"values":/g, "\"_children\":");

  fs.writeFile(fnamewriteNestmod2, result2, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});
    
// }