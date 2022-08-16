const express = require('express');
const router = express.Router();
const genresApiController = require('../../controllers/api/genresApiController ');

//Rutas exigidas para la creación del CRUD

//List end-point
router.get('/', genresApiController.list);

//Detail end-point
router.get('/detail/:id', genresApiController.detail);



module.exports = router;