import express from 'express';
import { updateAnimal, deleteAnimal } from '../controllers/animal.controller.js';

const router = express.Router();

router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

export default router;
