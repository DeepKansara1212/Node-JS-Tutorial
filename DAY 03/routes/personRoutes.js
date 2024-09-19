const express = require('express')
const router = express.Router()

// Import person from the models folder
const Person = require('../models/person') 

// POST route to add a person
router.post('/', async (req, res) => {

    try {
        const data = req.body

        // create a new Person document using the Mongoose model
        const newPerson = new Person(data)

        // Save the new person to the database
        const response = await newPerson.save()
        console.log('Data Saved');
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
    /* 
    const data = req.body  // Assuming the rquest body contains person data

    create a new Person document using the Mongoose model
    const newPerson = new Person(data)

    Not the appropriate way to parse the data, instead we can parse the data directly to the Person
    newPerson.name = data.name 
    newPerson.age = data.age 
    newPerson.work = data.work and so on....


    Save the new person to the database
        newPerson.save((error, savedPerson) => {
            if (error) {
                console.log('Error saving person:', error);
                res.status(500).json({ error: 'Internal server error' })
            } else {
                console.log('Data saved successfully');
                res.status(200).json(savedPerson)
            }
        });    
        This will give an error like newPerson.save() can't get the callback function 
        Here callback function is called when the data is saved in the database

    
    The upper code is the inappropriate code in terms of readability.
    So, Instead of using callback, we use Async & Await feature
    */
});

// GET method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log('Data Fetched');
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

// Parametrized API call
router.get('/:workType', async (req, res) => {

    try {
        // Extract the work type from the URL parameter
        const workType = req.params.workType;    

        // Set the validation to avoid the unneccessary data
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {

            const response = await Person.find({ work: workType })
            console.log('Response Fetched');
            res.status(200).json(response);

        } else {
            res.status(404).json({error: 'Invalid work type'})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})


// Update Operation
router.put('/:id', async (req, res) => {

    try {

        const personId = req.params.id   // Extract the id from the URL parameter
        const updatedPersonData = req.body  // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,              // Return the updated document
            runValidators: true     // Run Mongoose Validations
        });

        if(!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data Updated');
        res.status(200).json(response);

    } catch(err) { 
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } 
})


// Delete Operation
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id

        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId)

        if(!response) {
            return res.status(404).json({ error: 'Person not found' })
        }

        res.status(200).json({ message: 'Person deleted successfully.' })

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}) 

module.exports = router;