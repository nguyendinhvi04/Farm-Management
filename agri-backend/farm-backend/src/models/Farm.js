import pool from '../config/database.js';

/**
 * Farm Model
 * Handles all database operations for farms
 */
class Farm {
    /**
     * Get all farms for a specific user
     */
    static async getAllByUserId(userId) {
        try {
            const result = await pool.query(
                `SELECT f.*, u.username as owner_name
         FROM farms f
         JOIN user_farms uf ON f.id = uf.farm_id
         LEFT JOIN users u ON f.owner_id = u.id
         WHERE uf.user_id = $1
         ORDER BY f.created_at DESC`,
                [userId]
            );
            return result.rows;
        } catch (error) {
            throw new Error('Error fetching farms: ' + error.message);
        }
    }

    /**
     * Get farm by ID
     */
    static async getById(farmId) {
        try {
            const result = await pool.query(
                `SELECT f.*, u.username as owner_name, u.email as owner_email
         FROM farms f
         LEFT JOIN users u ON f.owner_id = u.id
         WHERE f.id = $1`,
                [farmId]
            );
            return result.rows[0] || null;
        } catch (error) {
            throw new Error('Error fetching farm: ' + error.message);
        }
    }

    /**
     * Create new farm
     */
    static async create(farmData) {
        const { name, location, size, owner_id } = farmData;

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Create farm
            const farmResult = await client.query(
                `INSERT INTO farms (name, location, size, owner_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING *`,
                [name, location, size, owner_id]
            );

            const farm = farmResult.rows[0];

            // Link user to farm in user_farms
            await client.query(
                `INSERT INTO user_farms (user_id, farm_id)
         VALUES ($1, $2)`,
                [owner_id, farm.id]
            );

            await client.query('COMMIT');
            return farm;
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error('Error creating farm: ' + error.message);
        } finally {
            client.release();
        }
    }

    /**
     * Create farm with initial plots
     */
    static async createWithPlots(farmData, plots = []) {
        const { name, location, size, owner_id } = farmData;

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Create farm
            const farmResult = await client.query(
                `INSERT INTO farms (name, location, size, owner_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING *`,
                [name, location, size, owner_id]
            );

            const farm = farmResult.rows[0];

            // Link user to farm
            await client.query(
                `INSERT INTO user_farms (user_id, farm_id)
         VALUES ($1, $2)`,
                [owner_id, farm.id]
            );

            // Create initial plots if provided
            if (plots && plots.length > 0) {
                for (const plot of plots) {
                    await client.query(
                        `INSERT INTO plots (farm_id, name, area, soil_type, status, created_at, updated_at)
             VALUES ($1, $2, $3, $4, 'active', NOW(), NOW())`,
                        [farm.id, plot.name, plot.area, plot.soil_type || null]
                    );
                }
            }

            await client.query('COMMIT');

            // Return farm with plots
            const plotsResult = await pool.query(
                'SELECT * FROM plots WHERE farm_id = $1',
                [farm.id]
            );

            return {
                ...farm,
                plots: plotsResult.rows
            };
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error('Error creating farm with plots: ' + error.message);
        } finally {
            client.release();
        }
    }

    /**
     * Update farm
     */
    static async update(farmId, farmData) {
        const { name, location, size } = farmData;

        try {
            const result = await pool.query(
                `UPDATE farms 
         SET name = $1, location = $2, size = $3, updated_at = NOW()
         WHERE id = $4
         RETURNING *`,
                [name, location, size, farmId]
            );
            return result.rows[0] || null;
        } catch (error) {
            throw new Error('Error updating farm: ' + error.message);
        }
    }

    /**
     * Delete farm
     */
    static async delete(farmId) {
        try {
            const result = await pool.query(
                'DELETE FROM farms WHERE id = $1 RETURNING *',
                [farmId]
            );
            return result.rows[0] || null;
        } catch (error) {
            throw new Error('Error deleting farm: ' + error.message);
        }
    }

    /**
     * Get farm statistics
     */
    static async getStatistics(farmId) {
        try {
            const stats = await pool.query(
                `SELECT 
          (SELECT COUNT(*) FROM plots WHERE farm_id = $1) as total_plots,
          (SELECT COUNT(*) FROM crops WHERE plot_id IN (SELECT id FROM plots WHERE farm_id = $1)) as total_crops,
          (SELECT COUNT(*) FROM animals WHERE farm_id = $1) as total_animals,
          (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE farm_id = $1 AND type = 'income') as total_income,
          (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE farm_id = $1 AND type = 'expense') as total_expense`,
                [farmId]
            );
            return stats.rows[0];
        } catch (error) {
            throw new Error('Error fetching farm statistics: ' + error.message);
        }
    }
}

export default Farm;
