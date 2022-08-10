const {body} = require('express-validator');
const path = require('path');

const validations = [
    body("name").notEmpty().withMessage("Debe ingresar un nombre"),
    body("ranking").notEmpty().withMessage("Debe ingresar un ranking"),
    body("active").notEmpty().withMessage("Debe ingresar un valor")                
]

module.exports = validations