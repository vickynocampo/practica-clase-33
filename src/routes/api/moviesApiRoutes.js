const express = require('express');
const router = express.Router();
const moviesApiController = require('../../controllers/api/moviesApiController');

//Rutas exigidas para la creación del CRUD

//Create movie end-point
router.post('/create', moviesApiController.create);

//Delete movie end-point
router.delete('/delete/:id', moviesApiController.delete);

//Search movie end-point
router.get('/search', moviesApiController.search);

module.exports = router;