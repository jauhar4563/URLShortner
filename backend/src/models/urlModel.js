import mongoose, { Schema } from "mongoose";
import shortid from "shortid";

const urlSchma  = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullUrl:{
        type:String,
        require:true
    },
    shortUrl:{
        type:String,
        require:true,
        default:shortid.generate
    },
    clicks:{
        type:Number,
        require:true,
        default:0   
    }
})

const shortUrl = mongoose.model('shortUrl',urlSchma)

export default shortUrl;