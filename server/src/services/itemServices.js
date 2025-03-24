import Item from "../models/Item.js"

const userService = {
    async create(title, description, url, quantity, price) {
        const item = new Item({ title, description, link: url, quantity: Number(quantity), price: Number(price) })
        await item.save();
    },

    async getAll() {
      const items = await Item.find()
      return items;
    },

    async getItemById(itemId){        
        const item = await Item.findById(itemId)
        if (!item) {
            throw new Error("Contact not found");
        }
        return item;
    },
    
    async deleteById(itemId){
        await Item.findByIdAndDelete(itemId);
    },

    async updateById(itemId, title, url, description, quantity, price){
        const item = await Item.findById(itemId)
        item.title = title;
        item.link = url;
        item.description = description;
        item.quantity = Number(quantity);
        item.price = Number(price);

        await item.save();
    }
}

export default userService