import Animal from '../models/Animal.js';

export const getAnimalsByFarm = async (req, res) => {
    try {
        const animals = await Animal.getByFarmId(req.params.farmId);
        res.json(animals);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getAnimalTypes = async (req, res) => {
    try {
        const types = await Animal.getAnimalTypes();
        res.json(types);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createAnimal = async (req, res) => {
    try {
        const animal = await Animal.create({ ...req.body, farm_id: req.params.farmId });
        res.status(201).json(animal);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateAnimal = async (req, res) => {
    try {
        const animal = await Animal.update(req.params.id, req.body);
        if (!animal) return res.status(404).json({ message: 'Animal not found' });
        res.json(animal);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const deleteAnimal = async (req, res) => {
    try {
        const animal = await Animal.delete(req.params.id);
        if (!animal) return res.status(404).json({ message: 'Animal not found' });
        res.json({ message: 'Deleted', animal });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
