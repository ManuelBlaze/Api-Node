const express = require('express');
const router = express.Router();
const comicController = require('../controllers/comicController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Create a new comic
// api/comics
router.post('/',
    auth,
    [
        check('name', 'The name is required').not().isEmpty(),
        check('category', 'The category is required').not().isEmpty(),
    ],
    comicController.createComic
);

//Get all the comics by category
router.get('/',
    auth,
    comicController.getComics
);

//Update the comic
router.put('/:id',
    auth,
    [
        check('name', 'The name is required in order to update the comic').not().isEmpty()
    ],
    comicController.updateComic
)

//Delete the comic
router.delete('/:id',
    auth,
    comicController.deleteComic
)

module.exports = router;