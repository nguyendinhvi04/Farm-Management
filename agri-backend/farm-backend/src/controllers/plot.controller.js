import Plot from '../models/Plot.js';

/**
 * Get all plots for a farm
 */
export const getFarmPlots = async (req, res) => {
    try {
        const { farmId } = req.params;
        const plots = await Plot.getAllByFarmId(farmId);
        return res.json(plots);
    } catch (error) {
        console.error('❌ Error fetching plots:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Get plot by ID
 */
export const getPlotById = async (req, res) => {
    try {
        const { id } = req.params;
        const plot = await Plot.getById(id);

        if (!plot) {
            return res.status(404).json({ message: 'Plot not found' });
        }

        return res.json(plot);
    } catch (error) {
        console.error('❌ Error fetching plot:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Create new plot
 */
export const createPlot = async (req, res) => {
    try {
        const { farmId } = req.params;
        const { name, area, soil_type, status } = req.body;

        // Validation
        if (!name) {
            return res.status(400).json({ error: 'Plot name is required' });
        }

        if (!area || area <= 0) {
            return res.status(400).json({ error: 'Valid plot area is required' });
        }

        const plotData = {
            farm_id: farmId,
            name,
            area,
            soil_type,
            status: status || 'active'
        };

        const plot = await Plot.create(plotData);

        return res.status(201).json({
            message: 'Plot created successfully',
            plot
        });
    } catch (error) {
        console.error('❌ Error creating plot:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Update plot
 */
export const updatePlot = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, area, soil_type, status } = req.body;

        // Validation
        if (!name) {
            return res.status(400).json({ error: 'Plot name is required' });
        }

        if (area && area <= 0) {
            return res.status(400).json({ error: 'Plot area must be positive' });
        }

        const plot = await Plot.update(id, { name, area, soil_type, status });

        if (!plot) {
            return res.status(404).json({ message: 'Plot not found' });
        }

        return res.json({
            message: 'Plot updated successfully',
            plot
        });
    } catch (error) {
        console.error('❌ Error updating plot:', error);
        return res.status(500).json({ error: error.message });
    }
};

/**
 * Delete plot
 */
export const deletePlot = async (req, res) => {
    try {
        const { id } = req.params;
        const plot = await Plot.delete(id);

        if (!plot) {
            return res.status(404).json({ message: 'Plot not found' });
        }

        return res.json({
            message: 'Plot deleted successfully',
            plot
        });
    } catch (error) {
        console.error('❌ Error deleting plot:', error);
        return res.status(500).json({ error: error.message });
    }
};
