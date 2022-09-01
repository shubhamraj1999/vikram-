// const UserModel= require("../models/userModel")

// const basicCode= async function(req, res) {
//     let tokenDataInHeaders= req.headers.token
//     console.log(tokenDataInHeaders)

//     console.log( "HEADER DATA ABOVE")
//     console.log( "hey man, congrats you have reached the Handler")
//     res.send({ msg: "This is coming from controller (handler)"})
//     }
// const createUser= async function (req, res) {
//     let data= req.body
//     let savedData= await UserModel.create(data)
//     res.send({msg: savedData})
// }

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }

// module.exports.createUser= createUser
// module.exports.getUsersData= getUsersData
// module.exports.basicCode= basicCode

const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const newUser = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length != 0) {
            let newData = await UserModel.create(data);
            res.status(201).send({ status: true, msg: newData });
        }
        else {
            res.status(400).send({ status: false, msg: "Bad Request!" });

        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};


const loginUser = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length != 0) {
            let user = await UserModel.findOne({ emailId: data.emailId, password: data.password });
            if (!user)
                return res.status(403).send({
                    msg: "username or the password is not corerct",
                });
            let token = jwt.sign(
                {
                    userId: user._id.toString(),
                    batch: "plutonium",
                    organisation: "FUnctionUp",
                },
                "secret key"
            );
            res.status(201).send({ status: true, token: token });
        }
        else {
            res.status(400).send({ msg: "BAD REQUEST" })
        }
    }
    catch (err) {
        
    res.status(500).send({ msg: "Error", error: err.message })
    };
}



const getUserDetails = async function (req, res) {
    try {
        let id = req.params.userId;
        let user = await UserModel.findOne({ _id: id, isDeleted: false });
        if (!user) {
            res.status(400).send({ status: false, msg: "User does not exist!" });
        } else {
            res.status(200).send({ status: true, msg: user });
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};




const updateUserDetails = async function (req, res) {
    try {
        let id = req.params.userId;
        let data = req.body;
        if (Object.keys(data).length != 0) {
            let user = await UserModel.findOneAndUpdate(
                { _id: id, isDeleted: false },
                data,
                { new: true }
            )
            if (!user) {
                res.status(400).send({ status: false, msg: "User does not exist!" });
            } else {
                res.status(200).send({ status: true, msg: user });
            }
        }
        else {
            return res.status(400).send({ msg: "BAD REQUEST" })
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}


const deleteUser = async function (req, res) {
    try {
        let id = req.params.userId;
        let user = await UserModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { isDeleted: true }
        )
        if (!user) {
            res.status(204).send({ status: false, msg: "User does not exist!" });
        } else {
            res.status(200).send({ status: true, msg: "User has been deleted successfully!" });
                
                
        }
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
}

module.exports = { newUser, loginUser, getUserDetails, updateUserDetails, deleteUser }