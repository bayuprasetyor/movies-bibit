var express = require('express');
var router = express.Router();

const {MoviesController} = require('../controllers/movies_controller')

router.get('/check', function (req, res, next) {
    res.status(200).json({
        status: true,
        message: "alive!",
        //data: req.headers
    })
});

router.get('/search', (req, res) => new MoviesController(req, res).searchMovies())
router.get('/detail/:id', (req, res) => new MoviesController(req, res).detailMovies())


module.exports = router