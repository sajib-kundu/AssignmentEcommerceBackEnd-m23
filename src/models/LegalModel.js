const mongoose = require('mongoose')
const DataSchema = mongoose.Schema({
    type:{type:String,unique:true,require:true},
    description:{type:String,require:true}
})

const LegalModel = mongoose.model('legals',DataSchema)

module.exports = LegalModel