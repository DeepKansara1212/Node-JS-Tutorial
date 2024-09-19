console.log('Notes pages loaded');

let age = 24          // we need to export it first then only it can shows the result in the main file, otherwise it will shows the output as undefined

const addNumber = (a, b) => {return a+b}

module.exports = {
    age,
    addNumber
} 