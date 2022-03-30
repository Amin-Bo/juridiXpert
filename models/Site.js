const mongoose = require('mongoose');
const { Schema } = mongoose;
const SiteSchema = new Schema({
    title:{
       type: String,
       require:true
    },
    url:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    logo:{
        type:String
    },
    phone:{
        type:String
    },
    fax:{
        type:String
    },
    etat:{
        type:Boolean
    },

    date:{
        type:Date,
        default:Date.now
    },
    owner: { type: mongoose.Schema.Types.ObjectId,
        ref: "User" },

}) ;
module.exports=Site=mongoose.model('sites',SiteSchema);
