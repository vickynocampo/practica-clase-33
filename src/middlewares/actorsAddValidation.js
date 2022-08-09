const {body} = require('express-validator');
const path = require('path');

const validations = [
    body("first_name").notEmpty().withMessage("Debe ingresar un nombre"),
    body("last_name").notEmpty().withMessage("Debe ingresar un apellido"),
    body("rating").notEmpty().withMessage("Debe ingresar un rating")          
]

module.exports = validations