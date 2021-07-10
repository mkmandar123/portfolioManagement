import { PortfolioController } from "./portfolio.controller";

const express = require('express');

const router = express.Router();

router.get('/getPortfolio', PortfolioController.getPortfolio);

export default router;
