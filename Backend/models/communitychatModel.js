const mongoose = require('mongoose')


const CommunitySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : String,
    createsBy : {type : mongoose.Types.ObjectId , ref : "User"},
    members : [{type : mongoose.Types.ObjectId , ref : ["Owner" , "Tenant"]}]
})

const GroupSchema = new mongoose.Schema({
    name:{
        type : String , 
        required : true
    },
    community : {type : mongoose.Types.ObjectId , ref : "Community"},
    createdBy : {type : mongoose.Types.ObjectId , ref : "User"},
    members : [{type : mongoose.Types.ObjectId , ref : ["Owner" , "Tenant"]}]
})

const MessageSchema = new mongoose.Schema({
    content : {type : String , required : true},
    userType: {
        type: String,
        required: true,
        enum: ['Owner', 'Tenant' , 'User'], // Valid models for reference
    },
    sender : {type : mongoose.Types.ObjectId ,  refPath: 'userType'},
    group :  {type : mongoose.Types.ObjectId , ref : 'Group'},
    timestamp : {
        type : Date,
        default : Date.now
    }
})

const Community = mongoose.model("Community" , CommunitySchema)
const Group = mongoose.model("Group" , GroupSchema)
const Message = mongoose.model("message" , MessageSchema)


module.exports = {Community , Group , Message}
