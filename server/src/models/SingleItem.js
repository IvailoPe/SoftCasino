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
    link:{
        type:String,
        required:true
    }
}, { timestamps: true });

const SingleItem = mongoose.model("SingleItem", userSchema)

export default SingleItem