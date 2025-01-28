const express = require('express');
const router = express.Router();
const image = require("../controllers/unsplashController");
const weather = require("../controllers/openWeatherMapController");
const manage = require("../controllers/manageData");

//rota dos controladores
router.get("/:location", weather.getWeather, image.getImage, manage.saveSupabase, manage.sendJSON);

module.exports = router;