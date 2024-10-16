// const express = require('express');
// const app = express();
// const port = process.env.PORT || 4092;

// // starting server
// app.listen(port,()=>{
//     console.log(`Server is listening on port http://localhost:${port}/`);
// })


// // middleware               // http://localhost:4092/home/?age=20
// const reqFilter=(req,res,next)=>{
//     // using middleware to access the website if user is above 18
//     if(req.query.age>18){
//         next();
//     }
//     else{
//         res.status(401).send('Access denied! User must be above 18 years old.')
//     }
// }

// //===============> Application level middleware     - it apply on all routes of application // using middleware    for all routes
// // app.use(reqFilter); 

// app.get('/home',(req,res)=>{
//     res.send('<h2>Welcome to home page</h2>')
// })


// //================>  Route level middleware  - it can be applied on specific or group of routes
// app.get('/about',reqFilter,(req,res) => {
//     res.send('Welcome to about page')
// })

// app.get('/contact',reqFilter,(req,res) => {
//     res.send('Welcome to contact page')
// })





//=================> applying middleware to group of routes

const express = require('express');
const app = express();
const route= express.Router();
const port = process.env.PORT || 4092;


// middleware               // http://localhost:4092/home/?age=20
const reqFilter=(req,res,next)=>{
    // using middleware to access the website if user is above 18
    if(req.query.age>18){
        next();
    }
    else{
        res.status(401).send('Access denied! User must be above 18 years old.')
    }
}


// Application level middleware     - it apply on all routes of application // using middleware    for all routes
// app.use(reqFilter);             


// Route level middleware  - it can be applied on group of routes
route.use(reqFilter)              
app.get('/', (req, resp) => {                       // http://localhost:4092/
    resp.send('Welcome to Home page')
});

app.get('/users1', (req, resp) => {                 // http://localhost:4092/users1
    resp.send('Welcome to Users page')
});

route.get('/about1', (req, resp) => {               // http://localhost:4092/about1?age=19
    resp.send('Welcome to About page')
});
route.get('/contact1', (req, resp) => {             // http://localhost:4092/contact1?age=19
    resp.send('Welcome to contact page')
});


// Route level middleware  - it can be applied on specific routes
app.get('/about',reqFilter,(req,res) => {           // http://localhost:4092/about?age=17
    res.send('Welcome to about page')
})

app.use('/',route);

app.listen(port,()=>{
    console.log(`Server is listening on port http://localhost:${port}/`);
})

