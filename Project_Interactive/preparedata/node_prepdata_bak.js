/*
This script populates the final dataset that will be used in d3 visualization.
 */

// npm i node-fetch --save
// ------------------------------------------------------

// load a default libraries
const fs = require('fs');
var async = require('async');
// var p5 = require('p5')
// var d3 = require("d3");
var data1;
var data2;

// Specify filenames
var fnamewrite = './data/aerophVizData.json'
var fnameread1 = './data/aerophonesForTreeR.json'
var fnameread2 = './data/metaerophFromAPI.json'

// Initialize variables
var obj = {};
var tempobj = {}
var objarr = [];
var count = 0;



    
    function readthefile(err,cb){
    data1 =  JSON.parse(fs.readFileSync(fnameread1, 'utf8'));
    // console.log("First data \n" + data1);    
     data2 =  JSON.parse(fs.readFileSync(fnameread2, 'utf8'));
    // console.log("Second data \n" + data2);   

if (err) {};

 async function innerloop(val1) {
    for (j = 0; j < data2.length; j++) {
        if (val1["Object.ID"] == data2[j]["objectID"]) {
            // count++;
            console.log(val1["Object.ID"] + " " + data2[j]["objectID"])
            // console.log(i)
            tempobj.level1 = val1.level;
            tempobj.level2 = val1.level2;
            tempobj.level3 = val1.level3;
            tempobj.name = val1.Names;
            tempobj.material = val1.Material;
            // tempobj.materials = val2.medium;
            // tempobj.objectURL = val2.objectURL;
            // tempobj.fullname = val2.objectName;
            // tempobj.filename = val2.fnImageSmall;
            //  tempobj.level1 = data1[i].level;
            //  tempobj.level2 = data1[i].level2;
            //  tempobj.level3 = data1[i].level3;
            //  tempobj.name = data1[i].Names;
            //  tempobj.material = data1[i].Material;
            //  tempobj.country = data1[i].Country;
            tempobj.materials = data2[j].medium;
            tempobj.objectURL = data2[j].objectURL;
            tempobj.fullname = data2[j].objectName;
            tempobj.filename = data2[j].fnImageSmall;
            // console.log(tempobj)
            objarr.push(tempobj);
            return tempobj;
        }
    };
};



   async function outerloop(err, callback) {
        console.log('Start')
        for (let index = 0; index < data1.length; index++) {
            const objhere = await innerloop(data1[index])
            // console.log(objhere)
            
        }
        console.log('End')
        // console.log("teh arr" + objarr[0] + ' ' + objarr[260])
        // console.log(objarr)
    }


async function writethefile(err,callback){
await outerloop();

        await fs.writeFile(fnamewrite, JSON.stringify(objarr), null, "\n")

    // console.log(objarr)
}

    
    

 cb(writethefile());




}

 readthefile();

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