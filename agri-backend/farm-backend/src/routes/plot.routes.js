import express from 'express';
import {
    getFarmPlots,
    getPlotById,
    createPlot,
    updatePlot,
    deletePlot
} from '../controllers/plot.controller.js';

const router = express.Router();

// GET /plots/:id - Get plot by ID
router.get('/:id', getPlotById);

// PUT /plots/:id - Update plot
router.put('/:id', updatePlot);

// DELETE /plots/:id - Delete plot
router.delete('/:id', deletePlot);

export default router;
