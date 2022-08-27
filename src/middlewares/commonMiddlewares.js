
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

const validateHeader= function ( req, res, next) {
    let headers = req.headers
    let appType = headers["isFreeAppUser"]
    if(!appType) {
        appType = headers["isfreeappuser"]
    }
    if(!appType) {
        return res.send({status: false, message: "A mandatory header is missing"})
    }

    //let appTypeFree = Boolean(appType)//This works on truthy/falsy
    if(appType == 'true') {
        req.appTypeFree = true
    } else {
        req.appTypeFree = false
    }

    next()
}

module.exports.validateHeader= validateHeader
