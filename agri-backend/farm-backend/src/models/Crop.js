import pool from '../config/database.js';

const Crop = {
    async getByFarmId(farmId) {
        const result = await pool.query(`
      SELECT c.*, ct.name as crop_type_name, ct.growth_duration,
             p.name as plot_name, s.name as season_name
      FROM crops c
      LEFT JOIN crop_types ct ON c.crop_type_id = ct.id
      LEFT JOIN plots p ON c.plot_id = p.id
      LEFT JOIN seasons s ON c.season_id = s.id
      WHERE p.farm_id = $1
      ORDER BY c.created_at DESC
    `, [farmId]);
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query(`
      SELECT c.*, ct.name as crop_type_name, p.name as plot_name, s.name as season_name
      FROM crops c
      LEFT JOIN crop_types ct ON c.crop_type_id = ct.id
      LEFT JOIN plots p ON c.plot_id = p.id
      LEFT JOIN seasons s ON c.season_id = s.id
      WHERE c.id = $1
    `, [id]);
        return result.rows[0];
    },

    async create(data) {
        const { plot_id, crop_type_id, season_id, name, plant_date, harvest_date, quantity, status } = data;
        const result = await pool.query(`
      INSERT INTO crops (plot_id, crop_type_id, season_id, name, plant_date, harvest_date, quantity, status, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW(),NOW()) RETURNING *
    `, [plot_id, crop_type_id, season_id, name, plant_date, harvest_date, quantity, status || 'growing']);
        return result.rows[0];
    },

    async update(id, data) {
        const { name, plant_date, harvest_date, quantity, status } = data;
        const result = await pool.query(`
      UPDATE crops SET name=$1, plant_date=$2, harvest_date=$3, quantity=$4, status=$5, updated_at=NOW()
      WHERE id=$6 RETURNING *
    `, [name, plant_date, harvest_date, quantity, status, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query('DELETE FROM crops WHERE id=$1 RETURNING *', [id]);
        return result.rows[0];
    },

    async getCropTypes() {
        const result = await pool.query('SELECT * FROM crop_types ORDER BY name');
        return result.rows;
    },

    async createCropType(data) {
        const { name, growth_duration, description } = data;
        const result = await pool.query(`
            INSERT INTO crop_types (name, growth_duration, description, created_at, updated_at)
            VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *
        `, [name, growth_duration, description]);
        return result.rows[0];
    },

    async updateCropType(id, data) {
        const { name, growth_duration, description } = data;
        const result = await pool.query(`
            UPDATE crop_types SET name=$1, growth_duration=$2, description=$3, updated_at=NOW()
            WHERE id=$4 RETURNING *
        `, [name, growth_duration, description, id]);
        return result.rows[0];
    },

    async deleteCropType(id) {
        const result = await pool.query('DELETE FROM crop_types WHERE id=$1 RETURNING *', [id]);
        return result.rows[0];
    },
};

export default Crop;
