const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type: String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true}
})
const dataModel = mongoose.model("data", dataSchema)

module.exports = dataModel