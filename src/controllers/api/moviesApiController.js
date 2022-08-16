const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const moviesApiController = {
    create: async (req, res) => {
        try {
            let newMovie = await db.Movie.create({
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            })
            let respuesta = {
                meta: {
                    status: 200,
                    url: req.originalUrl
                },
                data: newMovie
            }
            res.json(respuesta)
        }
        catch (error) {
            let respuesta = {
                status: 500,
                message: error.errors[0].message
            }
            res.status(500).json(respuesta)
        }
    },
    delete: async (req, res) => {
        let resultado = await db.Movie.destroy({ where: { id: req.params.id } })
        return res.json(resultado)
    },
    search: async (req, res) => {
        let search = await db.Movie.findAll(
        { where: { title: { [Op.like]: '%' + req.query.keyword + '%' } } }
        )
        if (search.length > 0) {
        return res.status(200).json(search);
        } else {
        return res.status(200).json("No existen peliculas");
        }
    }
}
module.exports = moviesApiController;