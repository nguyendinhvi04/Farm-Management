
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE  -- Ví dụ: 'admin', 'farmer', 'employee'
);

-- Bảng users (sử dụng role_id thay vì ENUM role)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
);

-- Trigger cho updated_at trong users
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng farms
CREATE TABLE farms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    size DECIMAL(10,2),  -- Diện tích (hecta hoặc m2)
    owner_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Trigger cho updated_at trong farms
CREATE TRIGGER update_farms_timestamp
BEFORE UPDATE ON farms
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng plots (thêm image_url, latitude, longitude)
CREATE TABLE plots (
    id SERIAL PRIMARY KEY,
    farm_id INT NOT NULL,
    name VARCHAR(50),
    area DECIMAL(10,2),
    soil_type VARCHAR(50),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    image_url VARCHAR(255),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
);

-- Trigger cho updated_at trong plots
CREATE TRIGGER update_plots_timestamp
BEFORE UPDATE ON plots
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng seasons
CREATE TABLE seasons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,  -- Ví dụ: 'Mùa Xuân', 'Mùa Mưa'
    start_month INT,  -- Tháng bắt đầu (1-12)
    end_month INT,    -- Tháng kết thúc (1-12)
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger cho updated_at trong seasons
CREATE TRIGGER update_seasons_timestamp
BEFORE UPDATE ON seasons
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng crop_types
CREATE TABLE crop_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,  -- Ví dụ: 'Lúa', 'Rau Củ'
    growth_duration INT,  -- Số ngày sinh trưởng trung bình
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger cho updated_at trong crop_types
CREATE TRIGGER update_crop_types_timestamp
BEFORE UPDATE ON crop_types
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng crops (tích hợp đầy đủ: crop_type_id, season_id, và CHECK constraint)
CREATE TABLE crops (
    id SERIAL PRIMARY KEY,
    plot_id INT NOT NULL,
    crop_type_id INT,
    season_id INT,
    name VARCHAR(100),
    plant_date DATE,
    harvest_date DATE,
    quantity DECIMAL(10,2),
    status TEXT DEFAULT 'growing' CHECK (status IN ('growing', 'harvested', 'failed')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (plot_id) REFERENCES plots(id) ON DELETE CASCADE,
    FOREIGN KEY (crop_type_id) REFERENCES crop_types(id) ON DELETE SET NULL,
    FOREIGN KEY (season_id) REFERENCES seasons(id) ON DELETE SET NULL,
    CHECK (quantity >= 0)
);

-- Trigger cho updated_at trong crops
CREATE TRIGGER update_crops_timestamp
BEFORE UPDATE ON crops
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng animal_types
CREATE TABLE animal_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,  -- Ví dụ: 'Gà', 'Bò'
    average_lifespan INT,  -- Tuổi thọ trung bình (năm)
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Trigger cho updated_at trong animal_types
CREATE TRIGGER update_animal_types_timestamp
BEFORE UPDATE ON animal_types
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng animals (tích hợp animal_type_id và CHECK constraint)
CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    farm_id INT NOT NULL,
    animal_type_id INT,
    type VARCHAR(50),
    quantity INT,
    health_status VARCHAR(50),
    vaccine_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
    FOREIGN KEY (animal_type_id) REFERENCES animal_types(id) ON DELETE SET NULL,
    CHECK (quantity >= 0)
);

-- Trigger cho updated_at trong animals
CREATE TRIGGER update_animals_timestamp
BEFORE UPDATE ON animals
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng suppliers
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    farm_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
);

-- Trigger cho updated_at trong suppliers
CREATE TRIGGER update_suppliers_timestamp
BEFORE UPDATE ON suppliers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng fertilizers
CREATE TABLE fertilizers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,  -- Ví dụ: 'Phân Hữu Cơ', 'NPK 20-20-15'
    composition TEXT,  -- Thành phần (ví dụ: 'N:20%, P:20%, K:15%')
    supplier_id INT,   -- Liên kết với nhà cung cấp
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
);

-- Trigger cho updated_at trong fertilizers
CREATE TRIGGER update_fertilizers_timestamp
BEFORE UPDATE ON fertilizers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng inventory (tích hợp supplier_id)
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    farm_id INT NOT NULL,
    supplier_id INT,
    item_name VARCHAR(100),
    quantity DECIMAL(10,2),
    unit VARCHAR(20),  -- Ví dụ: kg, cái
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
);

-- Trigger cho updated_at trong inventory
CREATE TRIGGER update_inventory_timestamp
BEFORE UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    farm_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
);

-- Trigger cho updated_at trong customers
CREATE TRIGGER update_customers_timestamp
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    farm_id INT NOT NULL,
    customer_id INT,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10,2),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'shipped', 'delivered', 'cancelled')),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Trigger cho updated_at trong orders
CREATE TRIGGER update_orders_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng order_items
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    entity_id INT NOT NULL,  -- ID của crop hoặc animal (sản phẩm)
    entity_type TEXT NOT NULL CHECK (entity_type IN ('crop', 'animal')),
    quantity DECIMAL(10,2) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (quantity * price) STORED,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    -- entity_id xử lý logic ở app, tương tự care_logs
);

-- Trigger cho updated_at trong order_items
CREATE TRIGGER update_order_items_timestamp
BEFORE UPDATE ON order_items
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng transactions (tích hợp order_id)
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    farm_id INT NOT NULL,
    order_id INT,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    transaction_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- Trigger cho updated_at trong transactions
CREATE TRIGGER update_transactions_timestamp
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng care_logs (tích hợp fertilizer_id)
CREATE TABLE care_logs (
    id SERIAL PRIMARY KEY,
    entity_id INT NOT NULL,  -- ID của crop hoặc animal
    entity_type TEXT NOT NULL CHECK (entity_type IN ('crop', 'animal')),
    action VARCHAR(100),  -- Ví dụ: 'watering', 'fertilizing', 'vaccinating'
    description TEXT,
    date DATE NOT NULL,
    user_id INT,
    fertilizer_id INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (fertilizer_id) REFERENCES fertilizers(id) ON DELETE SET NULL
    -- Note: Không dùng FK trực tiếp cho entity_id vì có thể là crop hoặc animal; xử lý logic ở ứng dụng
);

-- Trigger cho updated_at trong care_logs
CREATE TRIGGER update_care_logs_timestamp
BEFORE UPDATE ON care_logs
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng assignments
CREATE TABLE assignments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    entity_id INT NOT NULL,  -- ID của plot, crop, hoặc animal
    entity_type TEXT NOT NULL CHECK (entity_type IN ('plot', 'crop', 'animal')),
    description TEXT,
    start_date DATE,
    end_date DATE,
    status TEXT DEFAULT 'assigned' CHECK (status IN ('assigned', 'completed')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    -- Tương tự, entity_id xử lý logic ở app
);

-- Trigger cho updated_at trong assignments
CREATE TRIGGER update_assignments_timestamp
BEFORE UPDATE ON assignments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng environmental_data
CREATE TABLE environmental_data (
    id SERIAL PRIMARY KEY,
    plot_id INT NOT NULL,
    date DATE NOT NULL,
    temperature DECIMAL(5,2),
    rainfall DECIMAL(5,2),
    humidity DECIMAL(5,2),
    other_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (plot_id) REFERENCES plots(id) ON DELETE CASCADE
);

-- Trigger cho updated_at trong environmental_data
CREATE TRIGGER update_environmental_data_timestamp
BEFORE UPDATE ON environmental_data
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng breeding_logs
CREATE TABLE breeding_logs (
    id SERIAL PRIMARY KEY,
    animal_id INT NOT NULL,
    breeding_date DATE,
    offspring_quantity INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

-- Trigger cho updated_at trong breeding_logs
CREATE TRIGGER update_breeding_logs_timestamp
BEFORE UPDATE ON breeding_logs
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Bảng user_farms (hỗ trợ multi-farm owner)
CREATE TABLE user_farms (
    user_id INT NOT NULL,
    farm_id INT NOT NULL,
    PRIMARY KEY (user_id, farm_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (farm_id) REFERENCES farms(id) ON DELETE CASCADE
);

-- Thêm indexes cho hiệu suất
CREATE INDEX idx_plots_farm_id ON plots (farm_id);
CREATE INDEX idx_crops_plot_id ON crops (plot_id);
CREATE INDEX idx_animals_farm_id ON animals (farm_id);
CREATE INDEX idx_transactions_farm_id ON transactions (farm_id);
CREATE INDEX idx_care_logs_entity ON care_logs (entity_id, entity_type);
CREATE INDEX idx_environmental_data_plot_date ON environmental_data (plot_id, date);

-- Thêm VIEW cho báo cáo lợi nhuận đơn giản
CREATE VIEW monthly_profit AS
SELECT 
    farm_id,
    EXTRACT(YEAR FROM transaction_date) AS year,
    EXTRACT(MONTH FROM transaction_date) AS month,
    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS profit
FROM transactions
GROUP BY farm_id, year, month;

-- Dữ liệu mẫu
INSERT INTO roles (name) VALUES ('admin'), ('farmer'), ('employee');
INSERT INTO users (username, password_hash, role_id, email) VALUES ('admin', 'hashed_password_here', 1, 'admin@farm.com');
INSERT INTO farms (name, location, size, owner_id) VALUES ('My Farm', 'Vietnam', 100.00, 1);
INSERT INTO suppliers (farm_id, name, contact) VALUES (1, 'Supplier A', '0123456789');
INSERT INTO customers (farm_id, name, contact) VALUES (1, 'Customer X', '0987654321');
INSERT INTO seasons (name, start_month, end_month, description) VALUES ('Mùa Xuân', 3, 5, 'Mùa trồng cây ngắn ngày');
INSERT INTO crop_types (name, growth_duration, description) VALUES ('Lúa', 120, 'Cây lương thực chính');
INSERT INTO animal_types (name, average_lifespan, description) VALUES ('Gà', 5, 'Vật nuôi lấy thịt và trứng');
INSERT INTO fertilizers (name, composition, supplier_id) VALUES ('NPK', 'N:20%, P:20%, K:15%', 1);