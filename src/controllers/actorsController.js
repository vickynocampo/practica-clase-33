const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {validationResult} = require("express-validator");
const { all } = require('../routes');

//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const actorsController = {
    list: (req, res) => {
        db.Actor.findAll()
            .then(actors => {
                res.render('actorsList.ejs', {actors})
            })
    },
    detail: (req, res) => {
        db.Actor.findByPk(req.params.id)
            .then(actor => {
                res.render('actorDetail.ejs', {actor});
            });
    },
    add: function (req, res) {
        return res.render("actorsAdd")
    },
    create: async function (req,res) {
        const resultValidation = validationResult(req);   
        if(resultValidation.errors.length > 0){
         return res.render("actorsAdd", {errors:resultValidation.mapped(), oldData: req.body})}
         else{db.Actor.create({//Utilizamos el metodo create dentro de db/sequelize para guardar los datos que llegan en el body
             first_name: req.body.first_name,
             last_name: req.body.last_name,
             rating: req.body.rating,
        });//luego redireccionamos al listado principal de movies
         res.redirect("/actors")}
     },        
     edit: async function(req,res) {
         //Debo pedir los actores
         let pedidoActor = await db.Actor.findByPk(req.params.id); //busco el actor cuyo id llega por params y la guardo en una variable       
         return res.render("actorEdit", {Actor: pedidoActor})
     },
     update: function (req,res) {       
         db.Actor.update({
             first_name: req.body.first_name,
             last_name: req.body.last_name,
             rating: req.body.rating,
            }, {where: {id: req.params.id}
         });
         res.redirect("/actors/")
     },
     delete: async function (req,res) {
        const actor =  await db.Actor
             .findByPk(req.params.id)        
             res.render('actorsDelete', { Actor: actor });
     },    
     destroy: function (req,res) {
         db.Actor.destroy({where: {id: req.params.id}})
         res.redirect("/actors/")
     }
}

module.exports = actorsController;