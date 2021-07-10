const express = require('express');
const controller = require('server/api/portfolio/portfolio.controller');

const router = express.Router();

router.post('/log', controller.createLog);
router.post('/assert', controller.assert);

export default router;
