import pool from '../config/database.js';

const Animal = {
    async getByFarmId(farmId) {
        const result = await pool.query(`
      SELECT a.*, at.name as animal_type_name, at.average_lifespan
      FROM animals a
      LEFT JOIN animal_types at ON a.animal_type_id = at.id
      WHERE a.farm_id = $1
      ORDER BY a.created_at DESC
    `, [farmId]);
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query(`
      SELECT a.*, at.name as animal_type_name
      FROM animals a
      LEFT JOIN animal_types at ON a.animal_type_id = at.id
      WHERE a.id = $1
    `, [id]);
        return result.rows[0];
    },

    async create(data) {
        const { farm_id, animal_type_id, type, quantity, health_status, vaccine_date } = data;
        const result = await pool.query(`
      INSERT INTO animals (farm_id, animal_type_id, type, quantity, health_status, vaccine_date, created_at, updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,NOW(),NOW()) RETURNING *
    `, [farm_id, animal_type_id, type, quantity, health_status || 'healthy', vaccine_date]);
        return result.rows[0];
    },

    async update(id, data) {
        const { type, quantity, health_status, vaccine_date } = data;
        const result = await pool.query(`
      UPDATE animals SET type=$1, quantity=$2, health_status=$3, vaccine_date=$4, updated_at=NOW()
      WHERE id=$5 RETURNING *
    `, [type, quantity, health_status, vaccine_date, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query('DELETE FROM animals WHERE id=$1 RETURNING *', [id]);
        return result.rows[0];
    },

    async getAnimalTypes() {
        const result = await pool.query('SELECT * FROM animal_types ORDER BY name');
        return result.rows;
    },
};

export default Animal;
