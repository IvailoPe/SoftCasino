import { Schema, mongoose } from 'mongoose';

const userSchema = new Schema({
    itemsQuantity: {
        type: String,
        required: true,
    },
    soldItems:{
        type:Number,
        required:true
    },
}, { timestamps: true });

const CasinoStats = mongoose.model("CasinoStats", userSchema)

export default CasinoStats