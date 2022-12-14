const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {validationResult} = require("express-validator");
const { all } = require('../routes');

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesController = {
    list: (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include : [{association:"genre"}, {association:"actors"}]}
            )
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    new: (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    add: function (req, res) {
       db.Genre.findAll()//se traen los generos de la db para compartir con el formulario de creacion y poder seleccionarlo en la vista
       .then(function(generos){
       return res.render("moviesAdd", {allGenres : generos})})
    },
    create: async function (req,res) {
       const allGenres = await db.Genre.findAll();
       const resultValidation = validationResult(req);   
       if(resultValidation.errors.length > 0){
        return res.render("moviesAdd", {errors:resultValidation.mapped(), allGenres:allGenres, oldData: req.body})}
        else{db.Movie.create({//Utilizamos el metodo create dentro de db/sequelize para guardar los datos que llegan en el body
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id      
        });//luego redireccionamos al listado principal de movies
        res.redirect("/movies")}
    },            
    edit: function(req,res) {
        //Debo pedir peliculas y debo pedir generos, dos pedidos asincronicos
        let pedidoPelicula = db.Movie.findByPk(req.params.id, { include: ["genre"]}); //busco la pelicula cuyo id llega por params y la guardo en una variable       
        let pedidosGeneros = db.Genre.findAll({raw:true}); 
        // //una vez que tengo los dos pedidos async me aseguro que se ejecuten juntos:
        Promise.all([pedidoPelicula, pedidosGeneros])
        .then(function([pelicula, generos]){
            let parseDate = {
                year: pelicula.release_date.getFullYear(),
                month: ("0" + (pelicula.release_date.getMonth() + 1)).slice(-2),
                date: ("0" + pelicula.release_date.getDate().toString()).slice(-2)
            }
             res.render("moviesEdit", {Movie: pelicula, allGenres : generos, parseDate})
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
module.exports = moviesController;