const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const actorsController = require('../controllers/actorsController');

//Middlewares
const validations = require('../middlewares/actorsAddValidation');

//Rutas exigidas para la creación del CRUD

//Create
router.get('/actors/add',  actorsController.add);
router.post('/actors/create', validations, actorsController.create);

//Read
router.get('/actors', actorsController.list);
router.get('/actors/detail/:id', actorsController.detail);

//Update
router.get('/actors/edit/:id', actorsController.edit);
router.put('/actors/update/:id', actorsController.update);

//Delete
router.get('/actors/delete/:id', actorsController.delete);
router.delete('/actors/delete/:id', actorsController.destroy);

module.exports = router;