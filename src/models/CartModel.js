const mongoose = require ('mongoose');

const DataSchema= mongoose.Schema({
        productID:{type:mongoose.Schema.Types.ObjectId,required:true},
        userID:{type:mongoose.Schema.Types.ObjectId,required:true},
        color:{type:String,required:true},
        qty:{type:String,required:true},
        size:{type:String,required:true},
//price property is not include in main project, it's in Assignment project requirement
        price:{type:String}

    },
    {timestamps:true,versionKey:false}
)

const CartModel = mongoose.model('carts',DataSchema);

module.exports = CartModel;