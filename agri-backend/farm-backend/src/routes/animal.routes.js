import express from 'express';
import { getAnimalsByFarm, getAnimalTypes, createAnimal, updateAnimal, deleteAnimal } from '../controllers/animal.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/', getAnimalsByFarm);
router.get('/types', getAnimalTypes);
router.post('/', createAnimal);
router.put('/:id', updateAnimal);
router.delete('/:id', deleteAnimal);

export default router;
