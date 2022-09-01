
// const mid1= function ( req, res, next) {
//     req.falana= "hi there. i am adding something new to the req object"
//     console.log("Hi I am a middleware named Mid1")
//     next()
// }

// const mid2= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid2")
//     next()
// }

// const mid3= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid3")
//     next()
// }

// const mid4= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid4")
//     next()
// }

// module.exports.mid1= mid1
// module.exports.mid2= mid2
// module.exports.mid3= mid3
// module.exports.mid4= mid4

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const Authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-Auth-token"];
        let userId = req.params.userId

        if (!token) {
            token = req.headers["x-auth-token"];
        }

        if (!token) {
            //404- not found
            return res.status(404).send({ status: false, msg: "token must be present" });
        }

        let decodedToken = jwt.verify(token, "secret key");

        if (!decodedToken) {
            //400- bad request
            return res.status(400).send({ status: false, msg: "token is invalid" });
        }

        if (decodedToken.userId !== userId) {
            //401- unauthorized
            return res.status(401).send({ status: false, msg: "User is not authorized" })
        }

        let user = await userModel.findOne({ _id: userId })
        if (user.isDeleted == true) {
            //404- not found
            return res.status(404).send({ status: false, msg: "user account is deleted" });
        }

        next();
    }
    catch (err) {
        console.log("This is the error :", err.message)
        //500- internal server error
        res.status(500).send({ msg: "Error", error: err.message })
    };
}
module.exports.Authenticate = Authenticate

