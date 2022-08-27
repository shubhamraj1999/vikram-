
const productModel = require("../models/productModel")

const createProduct = async function(req, res) {
    let productDetails = req.body
    let productCreated = await productModel.create(productDetails)
    res.send({status: true, data: productCreated})
}

module.exports.createProduct= createProduct