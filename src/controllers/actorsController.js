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
     edit: function(req,res) {
         //Debo pedir peliculas y debo pedir generos, dos pedidos asincronicos
         let pedidoPelicula = db.Movie.findByPk(req.params.id, { include: ["genre"]}); //busco la pelicula cuyo id llega por params y la guardo en una variable       
         let pedidosGeneros = db.Genre.findAll({raw:true}); 
         // //una vez que tengo los dos pedidos async me aseguro que se ejecuten juntos:
         Promise.all([pedidoPelicula, pedidosGeneros])
         .then(function([pelicula, generos]){
              res.render("moviesEdit", {Movie: pelicula, allGenres : generos})
         })
     },
     update: function (req,res) {       
         db.Movie.update({
             title: req.body.title,
             rating: req.body.rating,
             awards: req.body.awards,
             release_date: req.body.release_date,
             length: req.body.length,
             genre_id: req.body.genre_id     
         }, {where: {id: req.params.id}
         });
         res.redirect("/movies/")
     },
     delete: async function (req,res) {
        const movie =  await db.Movie
             .findByPk(req.params.id)        
             res.render('moviesDelete', { Movie: movie });
     },    
     destroy: function (req,res) {
         db.Movie.destroy({where: {id: req.params.id}})
         res.redirect("/movies/")
     }

}

module.exports = actorsController;