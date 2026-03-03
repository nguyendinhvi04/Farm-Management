import express from 'express';
import { getCropsByFarm, getCropTypes, createCrop, updateCrop, deleteCrop } from '../controllers/crop.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', getCropsByFarm);
router.get('/types', getCropTypes);
router.post('/', createCrop);
router.put('/:id', updateCrop);
router.delete('/:id', deleteCrop);

export default router;
