const express = require('express');
const controller = require('server/api/trade/trade.controller');

const router = express.Router();

router.post('/log', controller.createLog);
router.post('/assert', controller.assert);

export default router;
