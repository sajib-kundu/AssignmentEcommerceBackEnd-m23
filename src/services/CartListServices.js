const CartModel = require('../models/CartModel');
const mongoose = require('mongoose');
const WishModel = require("../models/WishModel");
const ObjectID = mongoose.Types.ObjectId

const CartListService = async (req)=>{
    try{
        let user_id = new ObjectID(req.headers.user_id);

        let matchStage= {$match:{userID:user_id}}
        let JoinStageProduct = {$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindProductStage = {$unwind:"$product"}

        let JoinStageBrand = {$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}
        let unwindBrandStage = {$unwind:"$brand"}

        let JoinStageCategory = {$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
        let unwindCategoryStage = {$unwind:"$category"}

        let projectionStage={
            $project:{
                '_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,
                'product.categoryID':0,'product.brandID':0,
                'brand._id':0,'category._id':0

            }
        }

        let data = await CartModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindProductStage,
            JoinStageBrand,
            unwindBrandStage,
            JoinStageCategory,
            unwindCategoryStage,
            projectionStage

        ])
        return{status:"success", data:data}
    }
    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }
}

const SaveCartListService = async (req)=>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await CartModel.create(reqBody)
        return{status:"success", message:"Cart List Save Success"}
    }

    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }

}

const UpdateCartListService = async (req)=>{
    try {
        let user_id = req.headers.user_id;
        let cartID=req.params.cartID;
        let reqBody = req.body;

        // Single Find Query
        //let rows = await CartModel.find({_id:cartID});

        // let projectionStage={
        //     $project:{
        //         '_id':1,
        //
        //     }
        // }

//Finding the cart Id is exist in database or not start

        let DbCartId= await CartModel.findOne({_id:cartID}).select('_id')

 // Convert String value from an object
        const objString = JSON.stringify(DbCartId);
        const regex = /"_id":"([^"]+)"/;
        const match = objString.match(regex);
        const idString = match ? match[1] : null;
//Finding the cart Id is exist in database or not end

        if(cartID===idString){
            await CartModel.updateOne({_id:cartID,userID:user_id},{$set:reqBody});
            return{status:"success", message:"Cart List Update Success"}
        }
        else{
            return {status:"Not Updated", message:"Please Enter a Valid Cart ID"}
        }

    }
    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }
}

const RemoveCartListService = async (req)=>{
    try{
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;


        let result = await CartModel.deleteOne(reqBody)

        const deleteCount = result.deletedCount;

        if (deleteCount>0){
            return{status:"success", message:"Cart List Remove Success"}
        }
        else{
            return {status:"fail", message:"Please Enter a correct ProductID and CartID"}
        }

    }

    catch (e) {
        return {status:"fail", message:"Something Went Wrong"}

    }

}

module.exports = {
    CartListService,
    SaveCartListService,
    UpdateCartListService,
    RemoveCartListService
}