/*
  Exercise 5
  Analyzing a dataset
*/

const fs = require("fs");


// var getBiggest = function(){
//   console.log(testvar.class);
// };


// Task
// Copy in the function from Exercise 4
function getIrisData() {
  fs.readFile("./iris_json.json", "utf8", (err, data) => {  // Read JSON file
    if (err) console.log(err);  // error handling
    
    let content = {};
    let count = {};
    
    JSON.parse(data).forEach(function(element){   // convert JSON data to object
        if (!content[element.class]){
          content[element.class] = 0; // inizialize class value 1st time
          count[element.class] = 0;
        };   

      //add petallengths for each classname
      content[element.class] = content[element.class] + element.petallength;
      count[element.class] = count[element.class] + 1;
    }); // close JSON.parse
    
    
    console.log(content);   //show summation of lengths per class
    console.log(count); //show number of times these occur
    
    let longestAvLength = 0;
    let longestLengthName = "";
    
    for (var i in content){
      let aVLength = (content[i]/count[i]);
      if (aVLength > longestAvLength){
        longestAvLength = aVLength;
        longestLengthName = i;
    };
    };
    
    console.log(longestLengthName, longestAvLength);
    
    
    
}); //close readFile
}
    

// Task
// Replace the console.log statement with new code to determine which class of Iris (a variable in the data) has the longest average petal length
// HINT: Break down the problem into steps
// Don't forget to execute your function


getIrisData();