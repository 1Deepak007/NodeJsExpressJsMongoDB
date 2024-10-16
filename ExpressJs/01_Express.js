// Express.js is framework of node.js

const express = require('express');
const app = express();

// Setting up port
const port = process.env.PORT || 3233;

// Starting server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


//===================>  ROUTINGS  <=========================
// Defining routes
app.get('/',(req,res)=>{
    res.send('Welcome to home page.');
});

app.get('/about', (req, res) => {
    res.send('<h2 style="text-align:center;">About us</h2>');
});

app.get('/getname',(req,res)=>{
    res.send(`Your name is : ${req.query.name}`);
});

// Rendering HTML with proper JavaScript
app.get('/user', (req, res) => {
    res.send(`
            <input type='text' placeholder='name'/>
            <button id="alertButton">Click me</button>
            <script>
                document.getElementById('alertButton').addEventListener('click', function() {
                    alert('Hi');
                });
            </script>
    `);
});


// rendering json data
app.get('/userjson', (req, res) => {
    // res.json({name: 'John Doe', age: 30, city: 'New York'});
    res.send({
        name: 'John Doe', age: 30, city: 'New York'
    })
});

// rendering html pages                 //http://localhost:3233/profile.html
// path modules help in accessing different folders
const path = require('path');
const pages = path.join(__dirname,'pages'); 
app.use(express.static(pages));              // static method load static pages


app.get('/contact',(_, res)=>{          //http://localhost:3233/contact
    res.sendFile(path.join(pages,'contact.html'));
})



// keep profile.ejs in views folder otherwise we have to give path as in above routes
app.set('view engine','ejs')     
app.get('/profile',(_,res)=>{
    const user = {
        name:'Harry',
        email:'potter@gmail.com',
        country:'USA',
        skills:['js','python','django','nodejs','mysql','mongo','express']
    }
    res.render('profile',{user})
})

app.get('/login',(_,res)=>{
    res.render('login')
})

// Wildcard route for 404 handling (this should be at the end)
app.get('*', (req, res) => res.send('<h2>404 Page Not Found</h2>'));