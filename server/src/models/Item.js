import { Schema, mongoose } from 'mongoose';

const userSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity:{
        type:Number,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
}, { timestamps: true });

const Item = mongoose.model("Item", userSchema)

export default Item