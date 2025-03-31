import { rankProgression, reverseRankProgression, rankPrices } from "../constant/rankConstants.js";
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
        await user.save({ validateBeforeSave: false })
    },

    async removeAmount(userId, amount){
        const user = await User.findById(userId);
        user.money = Number(user.money) - Number(amount);
        await user.save({ validateBeforeSave: false })
    },

    async increaseXP(userId){
        const user = await User.findById(userId);
        
        
        user.rankBar += 10;
        if(reverseRankProgression[user.rankBar] !== user.rank && user.isPriceTaken !== false && reverseRankProgression[user.rankBar] !== undefined){
            user.isPriceTaken = false;
            user.rank = reverseRankProgression[user.rankBar];
        }
        else if(reverseRankProgression[user.rankBar] !== user.rank && reverseRankProgression[user.rankBar] !== undefined){    
            user.rankBar -= 10;
        }
        await user.save({ validateBeforeSave: false })
    },

    async getReward(userId){
        const user = await User.findById(userId);
        
        if(user.isPriceTaken === false){
            user.isPriceTaken = true;
            user.money += rankPrices[user.rank]
        }

        await user.save({ validateBeforeSave: false }) 
    }
}

export default CasinoStatsService;