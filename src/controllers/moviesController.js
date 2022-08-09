const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include : [{association:"genre"}, {association:"actors"}]}
            )
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
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
    'recomended': (req, res) => {
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
    //Crear
    add: function (req, res) {
       db.Genre.findAll()//se traen los generos de la db para compartir con el formulario de creacion y poder seleccionarlo en la vista
       .then(function(generos){
       return res.render("moviesAdd", {allGenres : generos})})
    },
    create: function (req,res) {
        db.Movie.create({
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            genre_id: req.body.genre_id      
        });//Utilizamos el metodo create dentro de db/sequelize para guardar los datos que llegan en el body
        res.redirect("/movies");//luego redireccionamos al listado principal de movies
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
        .then(movie => {res.redirect('/movies/', {Movie: movie});
        })
    }
}

module.exports = moviesController;