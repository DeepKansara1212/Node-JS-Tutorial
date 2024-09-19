const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();      // Config the dotenv file's data

const bodyParser = require('body-parser')
app.use(bodyParser.json())       // Stored in the req.body 

const PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
    res.send('Welcome to our Hotel...')
});


// Import the router files of 'person' & Use the routers
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes) 


// Import the router files of 'menu-item' & Use the routers
const menuItemRoutes = require('./routes/menuRoutes')
app.use('/menu-item', menuItemRoutes) 



app.listen(PORT, () => {
    console.log('Listening to port 3000');
}) 