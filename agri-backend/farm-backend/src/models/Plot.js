import pool from '../config/database.js';

/**
 * Plot Model
 * Handles all database operations for plots
 */
class Plot {
    /**
     * Get all plots for a farm
     */
    static async getAllByFarmId(farmId) {
        try {
            const result = await pool.query(
                `SELECT * FROM plots WHERE farm_id = $1 ORDER BY created_at DESC`,
                [farmId]
            );
            return result.rows;
        } catch (error) {
            throw new Error('Error fetching plots: ' + error.message);
        }
    }

    /**
     * Get plot by ID
     */
    static async getById(plotId) {
        try {
            const result = await pool.query(
                'SELECT * FROM plots WHERE id = $1',
                [plotId]
            );
            return result.rows[0] || null;
        } catch (error) {
            throw new Error('Error fetching plot: ' + error.message);
        }
    }

    /**
     * Create new plot
     */
    static async create(plotData) {
        const { farm_id, name, area, soil_type, status = 'active' } = plotData;

        try {
            const result = await pool.query(
                `INSERT INTO plots (farm_id, name, area, soil_type, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING *`,
                [farm_id, name, area, soil_type, status]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error creating plot: ' + error.message);
        }
    }

    /**
     * Update plot
     */
    static async update(plotId, plotData) {
        const { name, area, soil_type, status } = plotData;

        try {
            const result = await pool.query(
                `UPDATE plots 
         SET name = $1, area = $2, soil_type = $3, status = $4, updated_at = NOW()
         WHERE id = $5
         RETURNING *`,
                [name, area, soil_type, status, plotId]
            );
            return result.rows[0] || null;
        } catch (error) {
            throw new Error('Error updating plot: ' + error.message);
        }
    }

    /**
     * Delete plot
     */
    static async delete(plotId) {
        try {
            const result = await pool.query(
                'DELETE FROM plots WHERE id = $1 RETURNING *',
                [plotId]
            );
            return result.rows[0] || null;
        } catch (error) {
            throw new Error('Error deleting plot: ' + error.message);
        }
    }
}

export default Plot;
