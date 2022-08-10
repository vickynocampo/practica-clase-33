const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {validationResult} = require("express-validator");
const { all } = require('../routes');

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const genresController = {
    list: (req, res) => {
        db.Genre.findAll()
            .then(genres => {
                res.render('genresList.ejs', {genres})
            })
    },
    detail: (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    },
    add: function (req, res) {      
        return res.render("genresAdd")
     },
     create: async function (req,res) {
        const resultValidation = validationResult(req);   
        if(resultValidation.errors.length > 0){
         return res.render("genresAdd", {errors:resultValidation.mapped(), oldData: req.body})}
         else{db.Genre.create({
             name: req.body.name,
             ranking: req.body.ranking,
             active: req.body.active
        });
         res.redirect("/genres")}
     },            
    // edit: tiene sentido editar un genero (?), en ese caso, faltaria la vista genresEdit y su configuracion
    // async function(req,res) {     
    //     let pedidosGeneros = await db.Genre.findAll({raw:true});  
    //     res.render("genresEdit", {genre : pedidosGeneros}) 
    // },
    // update: tiene sentido editar un genero (?) 
    //     function (req,res) {       
    //      db.Genre.update({
    //          name: req.body.name,
    //          ranking: req.body.ranking,
    //          active: req.body.active           
    //      }, {where: {id: req.params.id}
    //      });
    //      res.redirect("/genres/")
    //  },
     delete: async function (req,res) {
        const genre =  await db.Genre
             .findByPk(req.params.id)        
             res.render('genreDelete', { Genre: genre });
     },    
     destroy: function (req,res) {
         db.Genre.destroy({where: {id: req.params.id}})
         res.redirect("/genres/")
     }
}

module.exports = genresController;