const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;

const genresApiController = {
    list: async (req, res) => {
        const genres = await db.Genre.findAll()
        let respuesta = {
            meta: {
                status: 200,
                total: genres.length,
                url: req.originalUrl
            },
            data: genres
        }
        res.status(200).json(respuesta)
    },
    detail: async (req, res) => {
        const genreDetail = await db.Genre.findByPk(req.params.id);
        let respuesta
        if (!genreDetail) {
            respuesta = {
                meta: {
                    url: req.originalUrl
                },
                message: 'Id inexistente'
            }
            res.status(400).json(respuesta)
        } else {
            respuesta = {
                meta: {
                    status: 200,
                    url: req.originalUrl
                },
                data: genreDetail
            }
        }
        res.json(respuesta)
    }
}

module.exports = genresApiController;