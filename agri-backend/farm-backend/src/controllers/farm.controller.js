import Farm from '../models/Farm.js';

/**
 * Get all farms for logged-in user
 */
export const getUserFarms = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const farms = await Farm.getAllByUserId(userId);
        return res.json(farms);
    } catch (error) {
        console.error('❌ Error fetching user farms:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Get farm by ID
 */
export const getFarmById = async (req, res) => {
    try {
        const { id } = req.params;
        const farm = await Farm.getById(id);

        if (!farm) {
            return res.status(404).json({ message: 'Farm not found' });
        }

        return res.json(farm);
    } catch (error) {
        console.error('❌ Error fetching farm:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Create new farm
 */
export const createFarm = async (req, res) => {
    try {
        const { name, location, size, plots } = req.body;
        const owner_id = req.user?.id || req.body.owner_id;

        // Validation
        if (!name) {
            return res.status(400).json({ error: 'Farm name is required' });
        }

        if (!owner_id) {
            return res.status(400).json({ error: 'Owner ID is required' });
        }

        if (size && (size < 0 || size > 10000)) {
            return res.status(400).json({ error: 'Farm size must be between 0 and 10,000 hectares' });
        }

        // Validate plots if provided
        if (plots && plots.length > 0) {
            const totalPlotArea = plots.reduce((sum, plot) => sum + (plot.area || 0), 0);
            if (size && totalPlotArea > size) {
                return res.status(400).json({
                    error: 'Total plot area cannot exceed farm size'
                });
            }
        }

        const farmData = { name, location, size, owner_id };

        // Create farm with or without plots
        const farm = plots && plots.length > 0
            ? await Farm.createWithPlots(farmData, plots)
            : await Farm.create(farmData);

        return res.status(201).json({
            message: 'Farm created successfully',
            farm
        });
    } catch (error) {
        console.error('❌ Error creating farm:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Update farm
 */
export const updateFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, size } = req.body;

        // Validation
        if (!name) {
            return res.status(400).json({ error: 'Farm name is required' });
        }

        if (size && (size < 0 || size > 10000)) {
            return res.status(400).json({ error: 'Farm size must be between 0 and 10,000 hectares' });
        }

        const farm = await Farm.update(id, { name, location, size });

        if (!farm) {
            return res.status(404).json({ message: 'Farm not found' });
        }

        return res.json({
            message: 'Farm updated successfully',
            farm
        });
    } catch (error) {
        console.error('❌ Error updating farm:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Delete farm
 */
export const deleteFarm = async (req, res) => {
    try {
        const { id } = req.params;
        const farm = await Farm.delete(id);

        if (!farm) {
            return res.status(404).json({ message: 'Farm not found' });
        }

        return res.json({
            message: 'Farm deleted successfully',
            farm
        });
    } catch (error) {
        console.error('❌ Error deleting farm:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Get farm statistics
 */
export const getFarmStatistics = async (req, res) => {
    try {
        const { id } = req.params;
        const stats = await Farm.getStatistics(id);

        return res.json(stats);
    } catch (error) {
        console.error('❌ Error fetching farm statistics:', error);
        return res.status(500).json({ error: error.message });
    }
};
