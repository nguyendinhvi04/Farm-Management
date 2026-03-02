import express from 'express';
import userRoutes from './user.routes.js';
import farmRoutes from './farm.routes.js';
import plotRoutes from './plot.routes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/farms', farmRoutes);
router.use('/plots', plotRoutes);
// thêm các nhóm route khác ở đây

export default router;
