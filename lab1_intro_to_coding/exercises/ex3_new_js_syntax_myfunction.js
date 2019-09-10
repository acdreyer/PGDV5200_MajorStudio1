/*
  Exercise 1 + 3
  JavaScript data structures & functions
  This exercise file adds ES6 syntax to the function at the end of the file.
*/

// Initialize variables
var names = [
  "Rubin Museum",
  "The Cooper Hewitt (Smithsonian)",
  "The Morgan Library and Museum",
  "The Whitney Museum of American Art",
  "The Frick Collection",
  "American Museum of Natural History",
];

var URLs = [
  "rubinmuseum.org",
  "cooperhewitt.org",
  "themorgan.org",
  "whitney.org",
  "frick.org",
  "amnh.org",
];

var years = [
  2004,
  1896,
  1924,
  1930,
  1935,
  1869
];

// Task 1
// Console log the length of each Array
console.log(names.length)
console.log(URLs.length)
console.log(years.length)

// Task 2
// add a new item to an array
var newName = "The International Center of Photography";
var newURL = "icp.org";
var newYear = 1974;

names.push(newName);
URLs[URLs.length] = newURL;     // Another way to do add element the array
years = years.concat([newYear]); // yet another way to add element to the array

// Task 3
// construct an Object out of our three Arrays
// the result should look similar to this:
var result = {
  "Museum Name 1": {
    URL: "www.museumwebsite.com",
    year: 2019
  }
}

//Note; abovementioned object structure can vary; it is chosen to be like this

var museums = {};
for (var i = 0; i < names.length; i++) {  //Loop through the arrays
  var currentName = names[i];   
  var currentURL = URLs[i];
  var currentYear = years[i];

  museums[currentName] = {};    // names are empty due to chosen object structure
  museums[currentName]["URL"] = currentURL; //Using the text method to reference object
  museums[currentName].year = currentYear;  //Using "." method to reference object
}

console.log('museums', museums)


//Do the whole process in another way using forEach method. 
// forEach is basically the for loop done implemented in a method.
var museums2 = {};
names.forEach(function(n,i) {
  museums2[n] = {};

  var currentURL = URLs[i];
  var currentYear = years[i];

  museums2[n].URL = currentURL;
  museums2[n]["year"] = currentYear;
});

// console.log('museums2', museums2)

// Task
// Write a function to add a new museum object, with properties URL and year, 
// to an existing museums object. Call it on museums2
const addAMuseum = (museums, newName, newURL, newYear) => {
  museums[newName] = {
    URL: newURL,
    year: newYear
  }

  return museums;
}

addAMuseum(museums2,"Museum of the City of New York", "mcny.org" , "1930");

console.log('museums2', museums2);