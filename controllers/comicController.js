const Comic = require('../models/Comic');
const Category = require('../models/Category');
const { validationResult } = require("express-validator");

//Create a new Comic
exports.createComic = async (req, res) => {

    // Check for errors
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()});
    }
    
    try {
        //Extract the category and validate his existence
        const { category } = req.body;

        const existCategory = await Category.findById(category);
        if (!existCategory) {
            return res.status(404).json({ msg: 'Category not found' })
        }

        //Check if the actual category belongs to the authenticated user
        if (existCategory.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You cant do this' })
        }
        
        //Create the comic
        const comic = new Comic(req.body);
        await comic.save();
        res.json({ comic });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server');   
    }
}

//Get the comics by category
exports.getComics = async (req, res) => {

    try {
        //Extract the category and validate his existence
        const { category } = req.body;

        const existCategory = await Category.findById(category);
        if (!existCategory) {
            return res.status(404).json({ msg: 'Category not found' })
        }

        //Check if the actual category belongs to the authenticated user
        if (existCategory.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You cant do this' })
        }

        //Get the comics by category
        const comics = await Comic.find({ category: category });
        res.json({ comics });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error with the server');
    }
}

//Update comic's info
exports.updateComic = async (req, res) => {
    
    try {
        //Extract the category and validate his existence
        const { category, name, read } = req.body;

        //Check if the comic exists
        let comic = await Comic.findById(req.params.id);
        if (!comic) {
            return res.status(404).json({ msg: 'Comic not found' })
        }

        //Extract category
        const existCategory = await Category.findById(category);

        //Check if the actual category belongs to the authenticated user
        if (existCategory.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You cant do this' })
        }

        //Create new info
        let newComic = {};

        if (name) newComic.name = name;

        if (read) newComic.read = read;

        //Save new comic
        comic = await Comic.findOneAndUpdate({ _id: req.params.id }, newComic, { new: true, useFindAndModify: false });
        res.json({ comic });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error with the server');
    }
}

//Delete Comic
exports.deleteComic = async (req, res) => {
    
    try {
        //Extract the category and validate his existence
        const { category } = req.body;

        //Check if the comic exists
        let comic = await Comic.findById(req.params.id);
        if (!comic) {
            return res.status(404).json({ msg: 'Comic not found' })
        }

        //Extract category
        const existCategory = await Category.findById(category);

        //Check if the actual category belongs to the authenticated user
        if (existCategory.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'You cant do this' })
        }

        //Delete comic
        await Comic.findOneAndRemove({ _id: req.params.id }, { useFindAndModify: false });
        res.json({ msg: 'Comic deleted succesfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error with the server');
    }
}