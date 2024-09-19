const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Welcome to my hotel... How can i help you? We have list of menus.')
})

app.get('/vadapao', (req, res) => {
    res.send("Welcome to Mumbai, we would love to serve you vadapao")
})

app.get('/Dosa', (req, res) => {
    const customized_dosa = {
        name: 'Rava Masala Dosa',
        size: '20 cm long',
        is_sambhaar: true,
        is_chutney: true,
        price: 300
    }
    // res.send("Sure sir! I would love to serve you dosa")
    res.send(customized_dosa) 
}) 

app.post('/items', (req, res) => {
    res.send('Item is shown')
})  

app.listen(3000, () => {
    console.log('Server is listening on port 3000'); 
}) 