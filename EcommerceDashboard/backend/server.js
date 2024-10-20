require('./db/config');                         // db connection
const express = require('express');             
const User = require('./db/models/User');       // model
const cors = require('cors');

const port = 5647
const app = express();


app.use(express.json());

// A CORS error (Cross-Origin Resource Sharing) happens when a web page tries to make a request to a different domain, protocol, or port than the one it was loaded from. Browsers block these requests for security reasons unless the server allows it.
// For example, if your frontend (React app) is running on http://localhost:3000 and tries to request data from a Node.js API on http://localhost:5000, the browser will block this by default because they are considered different origins.
// To fix this, the Node.js server needs to tell the browser, "Hey, it's okay for your frontend to request data from me." This is done by setting CORS headers in the server's response.
app.use(cors());                                // middleware

app.get('/',(req,res)=>{
    res.send('App is running');
});


// REGISTER API : Testing data -> raw, json -> {"name" : "Deepak","email" : "deepak@gmail.com","password" : "deepak"}
app.post("/register", async (req, res) => {
    try {
        let user = new User(req.body);      // receiving data from params
        let result = await user.save();     // saving data in database and waiting for completion
        result = result.toObject();
        delete result.password;             // removing password from the result object
        res.json(result);                   // send the result back as a JSON object (this is clean)
        console.log(result);                // log the saved user data for debugging
    } catch (error) {
        res.status(500).json({ error: "Error registering user", message: error.message });
        // console.error("Error saving user:", error);
    }
});



// LOGIN API - ensuring both email and password sent while logging-in 
app.post('/login', async(req,res) =>  {
    console.log(req.body);
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");   // get all details of user except password 
        if(user){
            res.send(user)
        }
        else{
            res.send({result : "User not found"});
        }
    }else{
        res.send({result : "Both Email and Password required"});
    }
});


app.listen(port, 
    console.log(`App listening at http://localhost:${port}`)
);




// app.listen(port);