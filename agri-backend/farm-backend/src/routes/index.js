import express from 'express';
import userRoutes from './user.routes.js';
import farmRoutes from './farm.routes.js';
import plotRoutes from './plot.routes.js';
import cropRoutes from './crop.routes.js';
import animalRoutes from './animal.routes.js';
import cropByIdRoutes from './cropById.routes.js';
import animalByIdRoutes from './animalById.routes.js';
import cropTypeRoutes from './cropType.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/farms', farmRoutes);
router.use('/plots', plotRoutes);
router.use('/farms/:farmId/crops', cropRoutes);
router.use('/farms/:farmId/animals', animalRoutes);
router.use('/crops', cropByIdRoutes);
router.use('/animals', animalByIdRoutes);
router.use('/crop-types', cropTypeRoutes);

export default router;
