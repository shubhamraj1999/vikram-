
const publisherModel = require ("../models/publisherModel")

const createPublisher= async function (req, res) {
    let publisher1 = req.body
    let publisherCreated = await AuthorModel.create(publisher1)
    res.send({data: publisherCreated})
}

const getpublisherData= async function (req, res) {
    let publisher2 = await publisherModel.find()
    res.send({data: publisher2})
}


module.exports.createPublisher = createPublisher
module.exports.getpublisherData = getpublisherData