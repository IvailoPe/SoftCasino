import { Schema, mongoose } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gamesPlayes: {
        type: Number,
        required: true
    },
    rank: {
        type: Number,
        required: true
    },
    rankBar: {
        type: Number,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    ordersMade: {
        type: Number,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'SingleItem' }]
}, { timestamps: true });

userSchema.post("validate", function (doc) {
    doc.password = bcrypt.hashSync(doc.password, 10);
})

const User = mongoose.model("User", userSchema)


export default User