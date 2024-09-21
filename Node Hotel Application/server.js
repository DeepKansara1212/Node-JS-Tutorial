const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();      // Config the dotenv file's data


const passport = require('./auth') 

const bodyParser = require('body-parser')
app.use(bodyParser.json())       // Stored in the req.body 

const PORT = process.env.PORT || 3000


// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next()     // Move on to next phase
}

app.use(logRequest)          // Middleware used on all the routes

app.use(passport.initialize())

// This middleware is asks the user to give the username & password
const localAuthMiddleware = passport.authenticate('local', {session: false})

// We have to make this to authenticate, so we have pass 'localAuthMiddleware' variable
app.get('/', function(req, res) {
    res.send('Welcome to our Hotel...')
}) 

// Import the router files of 'person' & Use the routers
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes) 


// Import the router files of 'menu-item' & Use the routers
const menuItemRoutes = require('./routes/menuRoutes');
app.use('/menu-item', menuItemRoutes)      
// app.use('/menu-item', logRequest, menuItemRoutes)      // Middleware used only in menu-item



app.listen(PORT, () => {
    console.log('Listening to port 3000');
}) 