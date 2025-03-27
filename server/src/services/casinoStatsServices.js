import CasinoStats from "../models/CasinoStats.js"
import User from "../models/User.js";

const id = "67e2161020193e39442f787b"

const CasinoStatsService = {
    async increaseQuantity(quantity){
       const casinoStats = await CasinoStats.findById(id);
       casinoStats.itemsQuantity += quantity
       await casinoStats.save()
    },

    async increaseSoldItems(soldItems){
        const casinoStats = await CasinoStats.findById(id);
        casinoStats.soldItems += soldItems
        await casinoStats.save()
    },
    
    async getSoldItemsNumber(){
        const casinoStats = await CasinoStats.findById(id);
        return casinoStats
    },

    async addAmount(userId, wonAmount){
        const user = await User.findById(userId);
        user.money = Number(user.money) + Number(wonAmount);
        await user.save()
    },

    async removeAmount(userId, amount){
        const user = await User.findById(userId);
        user.money = Number(user.money) - Number(amount);
        await user.save()
    }
}

export default CasinoStatsService;