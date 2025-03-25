import Item from "../models/Item.js"
import User from "../models/User.js"
import SingleItem from "../models/SingleItem.js"
import CasinoStatsService from "./casinoStatsServices.js"

const userService = {
    async create(title, description, url, quantity, price) {
        const item = new Item({ title, description, link: url, quantity: Number(quantity), price: Number(price) })
        await item.save();
    },

    async getAll() {
        const items = await Item.find()
        return items;
    },

    async getItemById(itemId) {
        const item = await Item.findById(itemId)
        if (!item) {
            throw new Error("Contact not found");
        }
        return item;
    },

    async deleteById(itemId) {
        await Item.findByIdAndDelete(itemId);
    },

    async updateById(itemId, title, url, description, quantity, price) {
        const item = await Item.findById(itemId)
        item.title = title;
        item.link = url;
        item.description = description;
        item.quantity = Number(quantity);
        item.price = Number(price);

        await item.save();
    },

    async buyItem(userId, itemId, quantity) {
        const item = await Item.findById(itemId);
        const user = await User.findById(userId)
        item.quantity = Number(item.quantity) - quantity;
        const singleItem = new SingleItem({ title: item.title, description: item.description, link: item.link });
        user.items.push(singleItem);
        user.ordersMade++;
        user.money = Number(user.money) - (quantity * Number(item.price));
        await CasinoStatsService.increaseSoldItems(quantity)
        await singleItem.save()
        await item.save();
        await user.save()
    },

    async getAllUserItems(userId){
        const user = await User.findById(userId).populate("items");
        return user;
    },

    async getSingleUserItem(userId, itemId){
        const user = await User.findById(userId).populate("items");
        for (const item of user.items) {            
            if(item._id.toString() === itemId){
                return item;
            }
        }
    }
}

export default userService