const Category = require('../models/Category');
const { validationResult } = require('express-validator');

//Create a new category
exports.createCategory = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        //Create a new category
        const category = new Category(req.body);

        //Save creator via jwt
        category.creator = req.user.id;

        //Save category
        category.save();
        res.json(category);

    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred');
    }
}

//Get all the actuall user's categories
exports.getCategories = async (req, res) => {
    
    try {
        const categories = await Category.find({ creator: req.user.id }).sort({ created: -1 });
        res.json({ categories });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error has ocurred');
    }
}

//Update category
exports.updateCategory = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    }
    
    //Extract all the category info
    const { name } = req.body;
    const newCategory = {};

    if (name) {
        newCategory.name = name;
    }

    try {
        
        //Check the ID
        let category = await Category.findById(req.params.id);

        //If category exists or not
        if (!category) {
            return res.status(404).json({ msg: 'Category not found'});
        }

        //Verify creator
        if (category.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You cant do this' })
        }

        //Update
        category = await Category.findByIdAndUpdate({ _id: req.params.id }, { $set: newCategory }, { new: true });

        res.json({ category });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server');
    }
}

//Delete category
exports.deleteCategory = async (req, res) => {

    try {       
        //Check the ID
        let category = await Category.findById(req.params.id);
    
        //If category exists or not
        if (!category) {
            return res.status(404).json({ msg: 'Category not found'});
        }
    
        //Verify creator
        if (category.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You cant do this' })
        }

        //Delete the category
        await Category.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Category removed succesfully' })
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server');
    }
}