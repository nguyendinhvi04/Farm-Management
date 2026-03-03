import Crop from '../models/Crop.js';

export const getCropsByFarm = async (req, res) => {
    try {
        const crops = await Crop.getByFarmId(req.params.farmId);
        res.json(crops);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const getCropTypes = async (req, res) => {
    try {
        const types = await Crop.getCropTypes();
        res.json(types);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createCropType = async (req, res) => {
    try {
        const type = await Crop.createCropType(req.body);
        res.status(201).json(type);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateCropType = async (req, res) => {
    try {
        const type = await Crop.updateCropType(req.params.id, req.body);
        if (!type) return res.status(404).json({ message: 'Crop type not found' });
        res.json(type);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const deleteCropType = async (req, res) => {
    try {
        const type = await Crop.deleteCropType(req.params.id);
        if (!type) return res.status(404).json({ message: 'Crop type not found' });
        res.json({ message: 'Deleted', type });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const createCrop = async (req, res) => {
    try {
        const crop = await Crop.create({ ...req.body, plot_id: req.body.plot_id });
        res.status(201).json(crop);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const updateCrop = async (req, res) => {
    try {
        const crop = await Crop.update(req.params.id, req.body);
        if (!crop) return res.status(404).json({ message: 'Crop not found' });
        res.json(crop);
    } catch (e) { res.status(500).json({ error: e.message }); }
};

export const deleteCrop = async (req, res) => {
    try {
        const crop = await Crop.delete(req.params.id);
        if (!crop) return res.status(404).json({ message: 'Crop not found' });
        res.json({ message: 'Deleted', crop });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
