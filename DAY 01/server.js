console.log("Server file is running...");

// Different ways to declare a function

// 1)
// function add(a, b) {
//     return a+b
// }

// 2)
// var add = function(a, b) {
//     return a+b
// }

// 3) 
// var add = (a, b) => {return a+b}

// 4) 
var add = (a, b) => a+b 

let result = add(3,5)
// console.log(result);


// IIFE => Immediately Invoked Function Expression

// (function() {
//     console.log("deep is added");
// })();


// CALLBACK FUNCTION
function callback(){
    console.log("Now, Callback Function is Calling...");
}

const mul = function(p, q, callback) {
    let result = p * q
    console.log('Result:' + result);      // main function work complete
    callback()
}

// mul(3, 4, callback) 


// IMP
// Built-in Modules
    // File System & OS modules 

var fs = require('fs')
var os = require('os')

var user = os.userInfo()
// console.log(user);

// fs.appendFile('greeting.txt', 'Hi' + user.username + '!\n', () => {
//     console.log('File is created');
// })    



// Import files from different location
const notes = require('./notes.js')

let age = notes.age
console.log(age);

let result2 = notes.addNumber(age, 18)
console.log(result2);


// For lodash library
var _ = require('lodash');
const { log } = require('console');


var data = ["person", "person", 1, 5, 1, 1, 8, "person", "deep", 8, 1, 8, 5, 2, 3]
var filter = _.uniq(data)
console.log(filter);

console.log(_.isString('deep'));
