const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const getWeather= require("../controllers/getWeather")
const meme = require("../controllers/meme")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/cowin/districtid",CowinController.districtId)

// get weathers 
router.get("/getWeather",getWeather.getWeather)
router.get("/getSortedCities",getWeather.getSortedCities)
router.get("/temperatureOfLondon",getWeather.temperatureOfLondon )

// memes assign edit and create memes
router.get("/getMemes", meme.getMeme)
router.post("/createMemes", meme.editMeme)





module.exports = router;


