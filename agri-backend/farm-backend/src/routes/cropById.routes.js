import express from 'express';
import { updateCrop, deleteCrop } from '../controllers/crop.controller.js';

const router = express.Router();

router.put('/:id', updateCrop);
router.delete('/:id', deleteCrop);

export default router;
