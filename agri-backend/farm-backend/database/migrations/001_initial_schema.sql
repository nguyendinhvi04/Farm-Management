-- Migration: Initial Database Schema
-- Version: 001
-- Description: Create all tables for Farm Management System
-- Author: nguyendv
-- Date: 2026-01-13

-- ============================================
-- FUNCTIONS
-- ============================================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TABLES (in dependency order)
-- ============================================

-- 1. Roles (no dependencies)
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Users (depends on roles)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Farms (depends on users)
CREATE TABLE IF NOT EXISTS farms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    size NUMERIC(10,2),
    owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. User-Farm relationship
CREATE TABLE IF NOT EXISTS user_farms (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    farm_id INTEGER NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, farm_id)
);

-- 5. Plots (depends on farms)
CREATE TABLE IF NOT EXISTS plots (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(50),
    area NUMERIC(10,2),
    soil_type VARCHAR(50),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    image_url VARCHAR(255),
    latitude NUMERIC(10,8),
    longitude NUMERIC(11,8),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Seasons (no dependencies)
CREATE TABLE IF NOT EXISTS seasons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    start_month INTEGER,
    end_month INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 7. Crop Types (no dependencies)
CREATE TABLE IF NOT EXISTS crop_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    growth_duration INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 8. Crops (depends on plots, crop_types, seasons)
CREATE TABLE IF NOT EXISTS crops (
    id SERIAL PRIMARY KEY,
    plot_id INTEGER NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
    crop_type_id INTEGER REFERENCES crop_types(id) ON DELETE SET NULL,
    season_id INTEGER REFERENCES seasons(id) ON DELETE SET NULL,
    name VARCHAR(100),
    plant_date DATE,
    harvest_date DATE,
    quantity NUMERIC(10,2) CHECK (quantity >= 0),
    status TEXT DEFAULT 'growing' CHECK (status IN ('growing', 'harvested', 'failed')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 9. Animal Types (no dependencies)
CREATE TABLE IF NOT EXISTS animal_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    average_lifespan INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 10. Animals (depends on farms, animal_types)
CREATE TABLE IF NOT EXISTS animals (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    animal_type_id INTEGER REFERENCES animal_types(id) ON DELETE SET NULL,
    type VARCHAR(50),
    quantity INTEGER CHECK (quantity >= 0),
    health_status VARCHAR(50),
    vaccine_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 11. Suppliers (depends on farms)
CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 12. Fertilizers (depends on suppliers)
CREATE TABLE IF NOT EXISTS fertilizers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    composition TEXT,
    supplier_id INTEGER REFERENCES suppliers(id) ON DELETE SET NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 13. Customers (depends on farms)
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 14. Orders (depends on farms, customers)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
    order_date DATE NOT NULL,
    total_amount NUMERIC(10,2),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'shipped', 'delivered', 'cancelled')),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 15. Order Items (depends on orders)
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    entity_id INTEGER NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('crop', 'animal')),
    quantity NUMERIC(10,2) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) GENERATED ALWAYS AS (quantity * price) STORED,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 16. Transactions (depends on farms, orders)
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    amount NUMERIC(10,2) NOT NULL,
    description TEXT,
    transaction_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 17. Inventory (depends on farms, suppliers)
CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    farm_id INTEGER NOT NULL REFERENCES farms(id) ON DELETE CASCADE,
    supplier_id INTEGER REFERENCES suppliers(id) ON DELETE SET NULL,
    item_name VARCHAR(100),
    quantity NUMERIC(10,2),
    unit VARCHAR(20),
    price NUMERIC(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 18. Care Logs (depends on users, fertilizers)
CREATE TABLE IF NOT EXISTS care_logs (
    id SERIAL PRIMARY KEY,
    entity_id INTEGER NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('crop', 'animal')),
    action VARCHAR(100),
    description TEXT,
    date DATE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    fertilizer_id INTEGER REFERENCES fertilizers(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 19. Assignments (depends on users)
CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    entity_id INTEGER NOT NULL,
    entity_type TEXT NOT NULL CHECK (entity_type IN ('plot', 'crop', 'animal')),
    description TEXT,
    start_date DATE,
    end_date DATE,
    status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'completed')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 20. Breeding Logs (depends on animals)
CREATE TABLE IF NOT EXISTS breeding_logs (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
    breeding_date DATE,
    offspring_quantity INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 21. Environmental Data (depends on plots)
CREATE TABLE IF NOT EXISTS environmental_data (
    id SERIAL PRIMARY KEY,
    plot_id INTEGER NOT NULL REFERENCES plots(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    temperature NUMERIC(5,2),
    rainfall NUMERIC(5,2),
    humidity NUMERIC(5,2),
    other_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- VIEWS
-- ============================================

CREATE OR REPLACE VIEW monthly_profit AS
SELECT 
    farm_id,
    EXTRACT(YEAR FROM transaction_date) AS year,
    EXTRACT(MONTH FROM transaction_date) AS month,
    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS profit
FROM transactions
GROUP BY farm_id, EXTRACT(YEAR FROM transaction_date), EXTRACT(MONTH FROM transaction_date);

-- ============================================
-- TRIGGERS
-- ============================================

CREATE TRIGGER update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_farms_timestamp
    BEFORE UPDATE ON farms
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_plots_timestamp
    BEFORE UPDATE ON plots
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_crops_timestamp
    BEFORE UPDATE ON crops
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_animals_timestamp
    BEFORE UPDATE ON animals
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();

-- ============================================
-- INDEXES (for performance)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_farms_owner_id ON farms(owner_id);
CREATE INDEX IF NOT EXISTS idx_plots_farm_id ON plots(farm_id);
CREATE INDEX IF NOT EXISTS idx_crops_plot_id ON crops(plot_id);
CREATE INDEX IF NOT EXISTS idx_animals_farm_id ON animals(farm_id);
CREATE INDEX IF NOT EXISTS idx_transactions_farm_id ON transactions(farm_id);
CREATE INDEX IF NOT EXISTS idx_orders_farm_id ON orders(farm_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
