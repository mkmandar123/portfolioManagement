import { TradeController } from './trade.controller';

const express = require('express');

const router = express.Router();

router.post('/createTrade', TradeController.createTrade);

export default router;
