
let axios = require("axios")

let getMeme = async function (req, res) {
    try {

        var options = {
            method: "get",
            url: `https://api.imgflip.com/get_memes`
        }
        let result = await axios(options)
        let data = result.data
        console.log(result.data)
        res.status(200).send({ msg: data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let editMeme = async function (req, res) {
    try {
        let template = req.query.template_id
        let firstText = req.query.text0
        let secondText = req.query.text1
        let userName = req.query.username
        let pass = req.query.password

        var options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${template}&text0=${firstText}&text1=${secondText}&username=${userName}&password=${pass}`
        }
        let result = await axios(options)
     
        let data = result.data
        console.log(result.data)
        res.status(200).send({ msg: data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getMeme =getMeme 
module.exports.editMeme =editMeme 

