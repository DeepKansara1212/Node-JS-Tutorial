const express = require('express')
const router = express.Router()

const MenuItem = require('../models/menuItem');

// POST route to add the menu item
router.post('/', async (req, res) => {

    try {
        const menuData = req.body
        const newMenuItem = new MenuItem(menuData)
        const savedMenuItem = await newMenuItem.save()

        console.log('Menu Saved');
        res.status(200).json(savedMenuItem)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

// GET method to get the menu-item
router.get('/', async (req, res) => {
    try {
        const menuData = await MenuItem.find()
        console.log('Data Fetched');
        res.status(200).json(menuData)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


// Parametrized API call
router.get('/:diffTaste', async (req, res) => {

    try {
        const diffTaste = req.params.diffTaste;

        if (diffTaste == 'Sweet' || diffTaste == 'Sour' || diffTaste == 'Spicy') {

            const response = await MenuItem.find({ taste: diffTaste })
            console.log('Response Fetched');
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid taste' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Update Operation
router.put('/:id', async (req, res) => {
    try {

        const menuItemId = req.params.id
        const updatedMenuItemData = req.body
        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedMenuItemData, {
            new: true,
            runValidators: true
        })

        if(!response){
            return res.status(404).json({ error: 'Person not found'})
        }

        console.log('Data Updated');
        res.status(200).json(response)

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// Delete Operation
router.delete('/:id', async (req, res) => {
    try {

        const menuItemId = req.params.id
        const response = await MenuItem.findByIdAndDelete(menuItemId)

        if(!response) {
            return res.status(404).json({ error: 'Person not found' })
        }

        res.status(200).json({ message: 'Person deleted successfully.' })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router