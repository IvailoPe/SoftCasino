import { Router } from 'express';
import CasinoStatsService from '../services/casinoStatsServices.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const casinoController = Router();

casinoController.get("/sold/items", async (req, res) => {
   const count = await CasinoStatsService.getSoldItemsNumber();
   res.json(count)
})

casinoController.post("/game/1",authMiddleware, async (req, res) => {
   const { wonAmount } = req.body;
   await CasinoStatsService.addAmount(req.user.id, wonAmount);
   res.json({message:"success"})
})

casinoController.put("/game/1",authMiddleware, async (req, res) => {
   const { amount } = req.body;
   await CasinoStatsService.removeAmount(req.user.id, amount);
   res.json({message:"success"})
})

casinoController.get("/xp",authMiddleware, async (req, res) => {   
   await CasinoStatsService.increaseXP(req.user.id);
   res.json({message:"success"})
})

casinoController.get("/reward",authMiddleware, async (req, res) => {   
   await CasinoStatsService.getReward(req.user.id);
   res.json({message:"success"})
})

export default casinoController