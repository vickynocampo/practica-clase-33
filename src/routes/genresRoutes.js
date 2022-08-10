const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const genresController = require('../controllers/genresController');

//Middlewares
const validations = require('../middlewares/genresAddValidation');

//Rutas exigidas para la creación del CRUD

//Create
router.get('/genres/add', genresController.add);
router.post('/genres/create', validations, genresController.create);

//Read
router.get('/genres', genresController.list);
router.get('/genres/detail/:id', genresController.detail);

//Update No tiene sentido modificar los generos(?)
//router.get('/genres/edit/:id', genresController.edit);
//router.put('/genres/update/:id', genresController.update);

//Delete
router.get('/genres/delete/:id', genresController.delete);
router.delete('/genres/delete/:id', genresController.destroy);

module.exports = router;