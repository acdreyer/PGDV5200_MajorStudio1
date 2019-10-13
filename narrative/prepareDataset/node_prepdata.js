/*

This script populates the final dataset that will be used in d3 visualization.

It groups the armor/weapon by type/affiliation and period and stores
the data in a new .json file.
The original annotation of the "movie scenes" are retained to avoid confusion, 
since the dataset needs to be reduced to fit the the narrative form.

i.e.
objectName -> filtered character id & Name (the entity acting in the storyline)
(legend displayname can be different than id...)
objectDates -> into scenes (each "scene" is half century; 50years)
classification -> affiliation (e.g. helmet, armor, staffwpn, gun)


Json format:
{
  "characters": [{
      "id": "Halberd",
      "name": "Halberd blah-blah-blah",
      "affiliation": "staffwpn"
    },
    ....
  ],
  "scenes": [   //array of arrays
    [
      "Halberd",
      "Mail armor",
      "War Hat"
    ],
    [...]
  ],
  "scnimages": [   //array of arrays
    [
      "Halberd",
      "Mail armor",
      "War Hat"
    ],
    [...]
  ]
  
  
  
}


 */



// ------------------------------------------------------

// load a default libraries
const fs = require('fs');
var async = require('async');
var d3 = require("d3");
// Specify filenames
var datalist = './data/metArmsFromAPI.json';
var fnamewrite = './narrVizData.json'
// fs.writeFileSync('./' + fnamewrite, '[', 'utf8');

// Initialize variables
var obj;
// let tempobj = {};
var myObjectIds = [];

var n;






// ---------------------------------------------------------
// Specify categories that need to be used in final plot:

// The timeline grouped by half centuries:
var halfcentrs = [1300, 1350, 1400, 1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1850];

// Declare scenehold as array of arrays
var scenehold = new Array(halfcentrs.length);
halfcentrs.forEach(function(value,index){
    scenehold[index] = [];
})
// console.log(halfcentrs.length);
let finaldata = { characters: [], scenes: [], scnimages: [], halfcentrs };

// The types of weapons and armor (i.e. the "characters" in this narrative timeline)
let characterlist = ["Halberd",
    "Guisarme",
    "Fauchard",
    "Partisan",
    "Military fork",
    "Barbute",
    "Bascinet",
    "Visored bascinet",
    "Armet",
    "Sallet",
    "Visored sallet",
    "Burgonet",
    "Closed burgonet",
    "Lobster-tail burgonet",
    "Morion",
    "Morion-cabasset",
    "Cabasset",
    // "War Hat",  //#remove japanese remove Cambodian
    // # "Spider Helmet",
    "Siege helmet",
    "Rapier",
    "Cup-hilted rapier",
    "Basket-hilted sword",
    "Hunting sword",
    "Claymore",
    "Smallsword",
    // "Two-Hand Sword",
    // "Two-Handed Sword",
    "Breech-loading needlefire rifle",
    "Matchlock gun",
    // "Snaphaunche lock",
    "Flintlock gun",
    "Percussion longrifle",
    "Wheellock rifle"
];
// console.log(characterlist.length)

// The grouping of each type of "character"; weapon or helmet
let staffwpn = ["Halberd", "Guisarme", "Fauchard", "Partisan", "Military fork"];
let helmet = ["Barbute", "Bascinet", "Visored bascinet", "Armet", "Sallet", "Visored sallet",
    "Burgonet", "Closed burgonet", "Lobster-tail burgonet", "Morion", "Morion-cabasset", "Cabasset",
    // "War Hat",  //#remove japanese remove Cambodian// # "Spider Helmet",
    "Siege helmet"
];
let other = ["Rapier", "Cup-hilted rapier", "Basket-hilted sword", "Hunting sword", "Claymore", "Smallsword",
    // "Two-Hand Sword",
    // "Two-Handed Sword",
];
let gun = ["Breech-loading needlefire rifle", "Matchlock gun", // "Snaphaunche lock",
    "Flintlock gun", "Percussion longrifle", "Wheellock rifle"
];
// ---------------------------------------------------------

// Apply character ranges from data input from R






// ---------------------------------------------------------
// Populate initial objects for characters. Use same id and name; no fancy names needed
characterlist.forEach(function(value, index) {
    let tempobj = {};
    tempobj.id = value;
    tempobj.name = value;
    if (staffwpn.includes(value)) { tempobj.affiliation = 'staffwpn' }
    if (helmet.includes(value)) { tempobj.affiliation = 'helmet' }
    if (other.includes(value)) { tempobj.affiliation = 'other' }
    if (gun.includes(value)) { tempobj.affiliation = 'gun' }
    finaldata.characters.push(tempobj);
})

// console.log(finaldata);
// ---------------------------------------------------------




// Initialize date (time/scene) ranges; max and min.
let charactersStartYear = [];
let charactersEndYear = [];







// console.log(charactersStartYear);
// console.log(charactersEndYear);

// ---------------------------------------------------------
// Load the MET data in order to create the scene grouping list
try {
    obj = JSON.parse(fs.readFileSync(datalist, 'utf8'));
    for (let i = 0; i < obj.length; i++) {
        //   for (let i =0; i< 5; i++){
        // console.log(obj[i]["objectID"])
        myObjectIds.push(obj[i]["objectID"])
    };

}
// ---------------------------------------------------------
catch (err) { console.log(err) }
// ---------------------------------------------------------
finally {



    // halfcentrs.forEach(function(value,index){
    //     var d3.obj
    // })


    // Determine the extent of date ranges for each character
    characterlist.forEach(function(value, index) {
        var filtdata = obj.filter(function(d) { return d.objectName == value });
        var mindate = d3.min(filtdata, function(d) { return +d.objectBeginDate; });
        var maxdate = d3.max(filtdata, function(d) { return +d.objectBeginDate; });
        // console.log(value + ' from ' + mindate + ' to ' + maxdate)
        charactersStartYear[index] = mindate;
        charactersEndYear[index] = maxdate;
        
        // Create the scene lists from contribution of characters by looping through dates
        halfcentrs.forEach(function(val2, indx2) {
        if (mindate <= val2 && maxdate >= val2){
            // temparray.push(value)
            scenehold[indx2].push(value);
        }

        });


    });
    // console.log(charactersStartYear);
    
    // Assign data to finaldata
    finaldata.scenes = scenehold;









};



console.log(finaldata);

fs.writeFileSync(fnamewrite, JSON.stringify(finaldata), null,"\n");






