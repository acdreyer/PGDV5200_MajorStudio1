/*
  Exercise 2
  JavaScript quirks and tricks
*/

var schoolName = "Parsons";
var schoolYear = 1936;

// Task
// What is the value of test3?
var test1;
if (1 == true) {
  test1 = true;
} else {
  test1 = false;
}

var test2;
if (1 === true) {
  test2 = true;
} else {
  test2 = false;
}

var test3 = test1 === test2;

// Task
// Change this code so test4 is false and test5 is true. Use console.log() to confirm your code works.

var test4 = 0 == "1";
var test5 = 1 === 1;

console.log("test4 is", test4, "and test 5 is", test5);

// Task
// What are the values of p, q, and r? Research what is going on here.
var w = 0.1;
var x = 0.2;
var y = 0.4;
var z = 0.5;

var p = w + x;

var q = z - x;

var r = y - w;

console.log("p = " + p + ", q = " + q + ", r = " + r);

// Comment: Javascript always uses 64-bit floating point numbers.
// This limits the amount of digits that can be stored. Adding numbers
// aggravates the imprecision. Subtracting numbers negates the imprecision.

