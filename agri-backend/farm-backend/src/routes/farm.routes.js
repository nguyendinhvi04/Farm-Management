import express from 'express';
import {
    getUserFarms,
    getFarmById,
    createFarm,
    updateFarm,
    deleteFarm,
    getFarmStatistics
} from '../controllers/farm.controller.js';
import {
    getFarmPlots,
    createPlot
} from '../controllers/plot.controller.js';

const router = express.Router();

// GET /farms/user/:userId - Get all farms for a user
router.get('/user/:userId', getUserFarms);

// GET /farms/:id - Get farm by ID
router.get('/:id', getFarmById);

// POST /farms - Create new farm
router.post('/', createFarm);

// PUT /farms/:id - Update farm
router.put('/:id', updateFarm);

// DELETE /farms/:id - Delete farm
router.delete('/:id', deleteFarm);

// GET /farms/:id/statistics - Get farm statistics
router.get('/:id/statistics', getFarmStatistics);

// GET /farms/:farmId/plots - Get farm plots
router.get('/:farmId/plots', getFarmPlots);

// POST /farms/:farmId/plots - Create plot
router.post('/:farmId/plots', createPlot);

export default router;
