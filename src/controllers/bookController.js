const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook = async function (req, res) {
    let book = req.body
    let authorId1 = book.author
    let publisherId1 = book.publisher
    let isValid = mongoose.Types.ObjectId.isValid(authorId1)
    let isValidp = mongoose.Types.ObjectId.isValid(publisherId1)
    if (isValid === false) {
        return res.send("invalid lenght of author")
    } else if (isValidp === false) {
        return res.send("invalid length of publisher id ")
    }

    let idfromauthor = await authorModel.findById(authorId1)
    let idfromPublisher = await publisherModel.findById(publisherId1)



    if (!idfromauthor) {
        return res.send("this author dosent exist")
    } else if (!idfromPublisher) {
        return res.send("this publisher dosent exist")
    } else if (!idfromauthor && !idfromPublisher) {
        return res.send("author and publisher both id's are invalid , please try with valid id ")
    } else {
        let bookCreated = await bookModel.create(book)
        res.send({ data: bookCreated })
    }
}


const getBooksData = async function (req, res) {
    
    let books =  await bookModel.find().populate('myAuthor').populate('myPublisher')    
   res.send({ data: books })
}

const getBooksWithAuthorDetails = async function (req, res) {
   
     let publisherData =   await publisherModel.find({name : ["Penguin","HarperCollins"]}).select({_id : 1})
     let bookid = await bookModel.updateMany({ publisher : publisherData },{ $set : {isHardCover : true , new : true }})

     let authorIds = await authorModel.find( { ratings : { $gt : 3.5 }}).select({_id : 1})
     let rating1 = await bookModel.updateMany({author : authorIds }, { $inc : {price :10 }},{new  : true})
  
     res.send({ data: bookid , rating1})
   }

   module.exports.createBook = createBook
   module.exports.getBooksData = getBooksData
   module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails

// const createBook= async function (req, res) {
//     let book = req.body
//     let bookCreated = await bookModel.create(book)
//     res.send({data: bookCreated})
// }

// const getBooksData= async function (req, res) {
//     let books = await bookModel.find()
//     res.send({data: books})
// }

// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }

// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
