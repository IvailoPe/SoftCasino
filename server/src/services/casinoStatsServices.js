import CasinoStats from "../models/CasinoStats.js"

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
    }
}

export default CasinoStatsService;