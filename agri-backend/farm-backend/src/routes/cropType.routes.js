import express from 'express';
import { getCropTypes, createCropType, updateCropType, deleteCropType } from '../controllers/crop.controller.js';

const router = express.Router();

router.get('/', getCropTypes);
router.post('/', createCropType);
router.put('/:id', updateCropType);
router.delete('/:id', deleteCropType);

export default router;
