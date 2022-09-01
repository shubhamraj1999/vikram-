
let axios = require("axios")


 let getWeather = async function (req, res) {
    try {
        let city = req.query.cities
        let appId = req.query.appid
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }

    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
let temperatureOfLondon = async function (req, res) {
    try {
        let city = "London"
        let key = req.query.appid
        if (key) {
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
            }
            let result = await axios(options)
            res.status(200).send({ status: true, msg: "London", data: result.data.main.temp })
        } else {
            res.status(400).send({ status: false, msg: "Please provide valid  key" })
        }

    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}



let getSortedCities = async function (req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjectArray = []
       
        for (i = 0; i < cities.length; i++) {

            let obj = { city: cities[i] }
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=a9159ca4303fe9d4f870caeb9b62b491`)
            console.log(resp.data.main.temp)

            obj.temp = resp.data.main.temp
            cityObjectArray.push(obj)
        }

        let sorted = cityObjectArray.sort(function (a, b) 
        { return a.temp - b.temp })

        console.log(sorted)
        res.status(200).send({ status: true, data: sorted })

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err.message })
    }
}




module.exports.getSortedCities = getSortedCities
module.exports.temperatureOfLondon = temperatureOfLondon 
module.exports.getWeather = getWeather
