const express = require('express');
const controller = require('./portfolio.controller');

const router = express.Router();

router.post('/test', (req, res) => res.send({success: true}));

export default router;
