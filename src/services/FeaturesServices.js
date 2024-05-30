const FeaturesModel = require('../models/FeaturesModel');
const LegalModel = require ('../models/LegalModel')

const FeaturesListService = async (req)=> {
    try {
        let data = await FeaturesModel.find()
        return {status: "success", data: data}

    } catch (e) {
        return {status: "fail", data: e}.toString()

    }
}

    const LegalDetailsService = async (req)=>{
        try{

            let type = req.params.type
            let data = await LegalModel.find()

            //let data = await LegalModel.find({tpe:type});
            console.log(type)
            console.log(data)
            return { status:"success", data:data}

        }
        catch (e) {
            return { status:"fail", data:e}.toString()

        }
}

module.exports = {FeaturesListService,
                  LegalDetailsService

            }