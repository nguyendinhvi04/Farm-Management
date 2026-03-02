# Database Documentation

## Overview

This directory contains all database-related files for the Farm Management System, including schema definitions, migrations, seed data, and backups.

## Directory Structure

```
database/
├── schema/
│   └── schema.sql              # Complete database schema (DDL only)
├── migrations/
│   ├── 001_initial_schema.sql  # Initial migration script
│   └── README.md               # Migration instructions
├── seeds/
│   └── seed_data.sql           # Sample/initial data (DML only)
└── backups/
    └── full_backup.sql         # Complete backup (schema + data)
```

## Database Schema

### Core Entities

**21 Tables:**
1. `roles` - User roles (admin, user, etc.)
2. `users` - System users
3. `farms` - Farm information
4. `user_farms` - Many-to-many relationship between users and farms
5. `plots` - Land plots within farms
6. `seasons` - Growing seasons
7. `crop_types` - Types of crops
8. `crops` - Crop instances
9. `animal_types` - Types of animals
10. `animals` - Animal instances
11. `suppliers` - Suppliers information
12. `fertilizers` - Fertilizer products
13. `customers` - Customer information
14. `orders` - Customer orders
15. `order_items` - Order line items
16. `transactions` - Financial transactions (income/expense)
17. `inventory` - Inventory management
18. `care_logs` - Care activities for crops/animals
19. `assignments` - Task assignments to users
20. `breeding_logs` - Animal breeding records
21. `environmental_data` - Environmental measurements

### Views

- `monthly_profit` - Monthly profit calculation per farm

### Functions

- `update_timestamp()` - Automatically updates `updated_at` field

## Setup Instructions

### 1. Create New Database

```bash
createdb -U nguyendv farm-management
```

### 2. Run Migration

```bash
psql -U nguyendv -d farm-management -f database/migrations/001_initial_schema.sql
```

### 3. Load Seed Data (Optional)

```bash
psql -U nguyendv -d farm-management -f database/seeds/seed_data.sql
```

## Restore from Backup

### Full Restore

```bash
# Drop existing database (WARNING: This will delete all data!)
dropdb -U nguyendv farm-management

# Create new database
createdb -U nguyendv farm-management

# Restore from backup
psql -U nguyendv -d farm-management -f database/backups/full_backup.sql
```

### Restore Schema Only

```bash
psql -U nguyendv -d farm-management -f database/schema/schema.sql
```

## Creating New Migrations

1. Create a new file: `database/migrations/00X_description.sql`
2. Follow naming convention: `{number}_{description}.sql`
3. Include both UP and DOWN migrations if possible
4. Test migration on development database first

Example:
```sql
-- Migration: Add email verification
-- Version: 002
-- Description: Add email_verified column to users table

ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
```

## Backup Database

### Schema Only

```bash
pg_dump -U nguyendv -d farm-management --schema-only -f database/schema/schema.sql
```

### Data Only

```bash
pg_dump -U nguyendv -d farm-management --data-only -f database/seeds/seed_data.sql
```

### Full Backup

```bash
pg_dump -U nguyendv -d farm-management -f database/backups/full_backup_$(date +%Y%m%d).sql
```

## Entity Relationships

### Farm Hierarchy
```
farms
├── plots
│   ├── crops
│   └── environmental_data
├── animals
├── customers
├── suppliers
├── orders
├── transactions
└── inventory
```

### User Management
```
roles
└── users
    ├── user_farms (many-to-many with farms)
    ├── assignments
    └── care_logs
```

## Important Notes

- All tables have `created_at` and `updated_at` timestamps
- Foreign keys use `ON DELETE CASCADE` or `ON DELETE SET NULL` appropriately
- Triggers automatically update `updated_at` on record modification
- Indexes are created on frequently queried columns for performance

## Environment Variables

Required in `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=farm-management
DB_USER=nguyendv
# DB_PASSWORD=  # Optional for local development
```

## Troubleshooting

### Connection Issues

```bash
# Check PostgreSQL is running
pg_isready

# Test connection
psql -U nguyendv -d farm-management -c "SELECT version();"
```

### Permission Issues

```bash
# Grant permissions
GRANT ALL PRIVILEGES ON DATABASE farm_management TO nguyendv;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nguyendv;
```

### Reset Database

```bash
# WARNING: This will delete all data!
dropdb -U nguyendv farm-management
createdb -U nguyendv farm-management
psql -U nguyendv -d farm-management -f database/migrations/001_initial_schema.sql
```
