const { Schema, model } = require("mongoose");

const Tenatschema= new Schema({
    Tenant_image:{
        type:String,

    },
    Owner_full_name:{
        type:String,
    },
    Owner_phone_number:{
        type:String,
    },
    Owner_address:{
        type:String,
    },
    Full_name:{
        type:String,
    },
    Phone_number:{
        type:String,
    },
    Email_address:{
        type:String,
    },
    Age:{
        type:Number,
    },
    Gender:{
        type:String,
        enum: ['Male', 'Female', 'Other']
    },
    Wing:{
        type:String,
    },
    Unit:{
        type:Number,
    },
    Relation:{
        type:String,
    },
    Adhar_front:{
        type:String,
    },
    Adhar_back:{
        type:String,
    },
    Address_proof:{
        type:String,
    },
    Rent_Agreement:{
        type:String,
    },
    Member_Counting: [{
        Full_name: { type: String },
        Phone_number: { type: String },
        Email_address: { type: String },
        Age: { type: Number },
        Gender: { type: String },
        Relation: { type: String }
    }],
    Vehicle_Counting: [{
        vehicle_type: { type: String },
        vehicle_name: { type: String },
        vehicle_number: { type: String }
    }],
    // cloudinary_id: {
    //     type: String,
    //   },
    role: {
        type: String,
        enum: ['admin', 'resident', 'security'], 
        default: 'resident' 
    },
   password: {  // Add this field to store the hashed password
        type: String,

    },
},{timestamps:true})


const Tenant = model("Tenant",Tenatschema);
module.exports=Tenant;