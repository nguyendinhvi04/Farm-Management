# Database Migrations

## Overview

This directory contains database migration scripts for the Farm Management System. Migrations are applied in numerical order to evolve the database schema over time.

## Migration Files

| Version | File | Description | Date |
|---------|------|-------------|------|
| 001 | `001_initial_schema.sql` | Initial database schema with all 21 tables | 2026-01-13 |
| 002 | `002_add_user_details.sql` | Add detailed user profile fields to users table | 2026-01-13 |
| 003 | `003_add_farming_fields.sql` | Add farming-specific fields (farm_area, main_crops, etc.) | 2026-01-13 |

## How to Run Migrations

### Run All Migrations

```bash
# From farm-backend directory
for file in database/migrations/*.sql; do
    echo "Running migration: $file"
    psql -U nguyendv -d farm-management -f "$file"
done
```

### Run Specific Migration

```bash
psql -U nguyendv -d farm-management -f database/migrations/001_initial_schema.sql
```

## Creating New Migrations

1. **Naming Convention:** `{version}_{description}.sql`
   - Version: 3-digit number (001, 002, 003, etc.)
   - Description: Short, descriptive name using underscores

2. **Template:**
```sql
-- Migration: [Title]
-- Version: [XXX]
-- Description: [What this migration does]
-- Author: [Your name]
-- Date: [YYYY-MM-DD]

-- Migration code here
```

3. **Best Practices:**
   - One migration per logical change
   - Include comments explaining complex changes
   - Test on development database first
   - Never modify existing migrations after they've been deployed
   - Consider adding rollback instructions in comments

## Migration History

### 001_initial_schema.sql
- Created all 21 core tables
- Added `update_timestamp()` function
- Created `monthly_profit` view
- Added triggers for automatic timestamp updates
- Created indexes for performance optimization

## Rollback Instructions

If you need to rollback a migration, you'll need to manually reverse the changes. Always backup your database before running migrations!

```bash
# Backup before rollback
pg_dump -U nguyendv -d farm-management -f backup_before_rollback_$(date +%Y%m%d_%H%M%S).sql

# Then manually run reverse SQL commands
```

## Notes

- Migrations are run manually (no automatic migration tool yet)
- Always backup database before running migrations
- Test migrations on development environment first
- Document any manual steps required alongside migrations
