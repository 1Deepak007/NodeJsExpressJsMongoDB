//================> Javascript refresher
console.log('Hello from NodeJs');

console.log(10 + 10)

var a = "100"; var b = 20;
console.log(a + b)

if (a === 100) { console.log("matched") }// value matched but datatype not matched
else { console.log("not matched") }


// for loop
for (i = 1; i <= 5; i++) { console.log(`Value of i is ${i}`) }

// while loop
var j = 1;
while (j <= 5) { console.log(`J is ${j}`); j++ }

// array
let arr1 = [100, 200, 300, 400, 500]
let arr = [1, 2, 3, 4, 5]; console.log(arr);
console.log(arr[0]);
arr.push(16); console.log(arr);           // add 16 at last
arr.pop(); console.log(arr);           // rem last ele
arr.shift(); console.log(arr);           // rem 0th ele
arr.unshift(10); console.log(arr);           // add element at 0th place
arr_join = arr.concat(arr1); console.log(arr_join);


// exporting things
module.exports = {
    name: "Deepak Gautam",
    square: function (a) {
        return a * a
    }
}

//===========>  map function
let numbers = [1, 2, 3, 4];
function sq(num) { return num * num }
let doubledNumbers = numbers.map(num => sq(num));           //OR    // let doubledNumbers = numbers.map(num => num * 2);
console.log(doubledNumbers); // [2, 4, 6, 8]



//===========> filter function
let result = numbers.filter(num => num % 2 === 0);
console.log(result);   // [2, 4]

let result1 = numbers.filter(num => num > 2);
console.log(result1);  //  [3, 4]




//=============> reduce function
let total = numbers.reduce((sum, currentValue) => sum + currentValue);
console.log(total); // 10




//=========================================> CORE MODULES (built in modules  e.g: console.log, file system (fs), Http, etc.) 
const fs = require('fs');

// Writing to a File
fs.writeFileSync("myfile.txt", "This file is created using file system of nodejs",
    (err) => {
        if (err) console.log(err)
        else console.log("File updated successfully")
    }
);

// Asynchronous file read
fs.readFile('myfile.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File content:', data);
});


//  Appending Data to a File
fs.appendFile('myfile.txt', 'This is appended data.', (err) => {
    if (err) console.error('Error appending file:', err);
    else console.log('File updated successfully');
});

//=======>  Deleting a file
fs.writeFile('mynewfile.txt', 'This file is to be deleted',
    (err) => {
        if (err) console.log(err)
        else console.log("File deleted successfully")
    }
);
fs.unlink('mynewfile.txt',(err)=>{
    if(err) return('Error deleting file');
    else return("file deleted successfully")
})

//=======> Checking if a File Exists
fs.access('myfile.txt', fs.constants.F_OK, (err) => {
    if (err) console.log("File does not exist");
    else console.log("File exists");
});




// CREATING SERVER
const port = 1272;
const http = require('http');

// Define the "datacontrol" function for its route
const dataControl = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("<h2>This is the datacontrol function</h2>");
    res.end();
};

// Main request handler
const requestHandler = (req, res) => {
    // Routes 
    if (req.url === '/') {
        // Setting response header to indicate HTML content
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<h2>Hii</h2>");
        res.write("Hi from nodejs server.");
        res.end();
    } else if (req.url === '/datacontrol') {        // Call the "dataControl" function for this route
        dataControl(req, res);
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("<h2>About Us</h2>");
        res.write("This is the about page.");
        res.write(JSON.stringify({name:"Deepak Gautam",email:"ds095536@gmail.com"}))
        res.end();
    } else {                                        // For any undefined routes, return a 404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write("<h2>404 Not Found</h2>");
        res.write("The page you are looking for does not exist.");
        res.end();
    }
};

// Create the server and listen on the specified port
http.createServer(requestHandler).listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});



//===============================================================================================================
//===============================>  CREATING SERVER & ROUTES USING EXPRESSJS  <==================================
//===============================================================================================================
const data = require('./utils/data');
const express = require('express');
const app = express();
const app_port = 4536

// middleware to parse json body
app.use(express.json())

// start server
app.listen(app_port, ()=>{
    console.log(`Server is running on port http://localhost:${app_port}/`)
})

// Routes
app.get('/',(req,res)=> {
    res.send('Welcome to home page.')
});

app.get('/about',(req,res)=> {
    res.send('This is about page.')
})

app.get('/data',(req,res)=>{
    res.json(data);
    // res.write(JSON.stringify(data))
})

app.use((req,res)=> {
    res.status(404).send("404 Not Found")
})

