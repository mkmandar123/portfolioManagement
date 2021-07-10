import { PortfolioController } from "./portfolio.controller";

const express = require('express');

const router = express.Router();

router.get('/getPortfolio', PortfolioController.getPortfolio);
router.get('/getPortfolioReturns', PortfolioController.getPortfolioReturns);

export default router;
