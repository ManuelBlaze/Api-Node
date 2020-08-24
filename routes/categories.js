const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crear una categoria
// api/categories
router.post('/',
    auth,
    [
        check('name', 'The category name is required').not().isEmpty()
    ],
    categoryController.createCategory
);

//Get all the categories
router.get('/',
    auth,
    categoryController.getCategories
);

//Update the category's name
router.put('/:id',
    auth,
    [
        check('name', 'The category name is required').not().isEmpty()
    ],
    categoryController.updateCategory
);

//Delete category
router.delete('/:id',
    auth,
    categoryController.deleteCategory
);

module.exports = router;