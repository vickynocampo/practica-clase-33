const {body} = require('express-validator');
const path = require('path');

const validations = [
    body("title").notEmpty().withMessage("Debe ingresar un titulo"),
    body("rating").notEmpty().withMessage("Debe ingresar un rating"),
    body("awards").notEmpty().withMessage("Debe ingresar los premios"),
    body("release_date").notEmpty().withMessage("Debes ingresar una fecha"),
    body("length").notEmpty().withMessage("Debe ingresar una longitud"),
    body("genre_id").notEmpty().withMessage("Debe seleccionar un genero"),       
]

module.exports = validations