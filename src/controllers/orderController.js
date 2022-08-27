const orderModel = require("../models/orderModel")
const userModel=require("../models/userModel")
const productModel=require("../models/productModel")


const newOrder = async function (req, res) {
    let data = req.body;
    let user = await userModel.findById(data.userId);
    if (user) {
        let product = await productModel.findById(data.productId);
        if (product) {
            if (req.headers.isfreeappuser == 'true') {
                data['amount'] = 0;
                data['isFreeAppUser'] = req.headers.isfreeappuser;
                let newData = await orderModel.create(data);
                res.send({ msg: newData });
            }
            else {
                if (user.balance >= product.price) {
                    await userModel.findOneAndUpdate(
                        { _id: data.userId },
                        { $set: { balance: user.balance - product.price } },
                        {new:true}
                    );
                    data['amount'] = product.price;
                    data['isFreeAppUser'] = req.headers.isfreeappuser;
                    let newData = await orderModel.create(data);
                    res.send({ msg: newData });
                }
                else {
                    res.send("Insufficient Balance!")
                }
            }
        }
        else {
            res.send('Invalid ProductID!');
        }

    }
    else {
        res.send('Invalid UserID!');
    }
}


module.exports.newOrder=newOrder