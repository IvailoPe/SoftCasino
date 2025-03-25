import { Router } from 'express';
import CasinoStatsService from '../services/casinoStatsServices.js';

const casinoController = Router();

casinoController.get("/sold/items", async (req, res) => {
   const count = await CasinoStatsService.getSoldItemsNumber();
   res.json(count)
})

export default casinoController