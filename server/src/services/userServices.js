import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const ranks = {
    iron:1,
    bronze:2,
    silver:3,
    gold:4,
    platinium:5,
    emerald:6,
    diamond:7,
    legendary:8
}

const userService = {
    async register(username, password) {
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            throw new Error('Username already exists');
        }

        const user = new User({ username, password,gamesPlayes:0,rank:ranks.iron, rankBar:0,money:0,ordersMade:0,profilePicture:"https://i.pinimg.com/736x/c0/27/be/c027bec07c2dc08b9df60921dfd539bd.jpg" });
        const savedUser = await user.save();

        const token = jwt.sign(
            { id: user._id, username: user.username }, "Mnogo sekretno"
        );

        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password;

        return { token, user: userWithoutPassword };
    },

    async login(username, password) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            "Mnogo sekretno"
        );

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return { token, user: userWithoutPassword };
    },

    async getUserById(id) {
        const user = await User.findById(id).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    async updateUserMoney(id, money){
        const user = await User.findById(id).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        await User.findByIdAndUpdate(id, {
            $inc: { money: +money }
        });
    },

    async updatePassword(id, oldPassword, newPassword) {
        const user = await User.findById(id);
        
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        await user.save({ validateBeforeSave: false });
        return { message: 'Password updated successfully' };
    },

    async updateUsername(id, password, newUsername) {
        const user = await User.findById(id);
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.username = newUsername;
        await user.save({ validateBeforeSave: false });
        return { message: 'Username updated successfully' };
    },

    async deleteProfile(userId, password) {  
        try {
            const user = await User.findById(userId);

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error("Wrong password")
            }

            await User.findByIdAndDelete(userId);

            if (!user) {
                throw new Error("User not found");
            }

            return { message: "success" }
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    },

    async updateProfilePicture(id, password, newUrl){
        const user = await User.findById(id);
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            throw new Error("Wrong password")
        }

        user.profilePicture = newUrl;
        await user.save({ validateBeforeSave: false });
        return { message: 'Url updated successfully' };
    }

}

export default userService