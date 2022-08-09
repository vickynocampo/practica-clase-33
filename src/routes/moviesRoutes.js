const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const moviesController = require('../controllers/moviesController');

//Validaciones
const validations = [
    body("title").notEmpty().withMessage("Debe ingresar un titulo"),
    body("rating").notEmpty().withMessage("Debe ingresar un rating"),
    body("awards").notEmpty().withMessage("Debe ingresar los premios"),
    body("release_date").notEmpty().withMessage("Debes ingresar una fecha"),
    body("length").notEmpty().withMessage("Debe ingresar una longitud"),
    body("genre_id").notEmpty().withMessage("Debe seleccionar un genero"),       
]
//Rutas exigidas para la creación del CRUD

//Create
router.get('/movies/add',  moviesController.add);
router.post('/movies/create', validations, moviesController.create);

//Read
router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/detail/:id', moviesController.detail);

//Update
router.get('/movies/edit/:id', moviesController.edit);
router.put('/movies/update/:id', moviesController.update);

//Delete
router.get('/movies/delete/:id', moviesController.delete);
router.delete('/movies/delete/:id', moviesController.destroy);

module.exports = router;