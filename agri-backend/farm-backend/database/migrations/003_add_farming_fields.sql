-- Migration: Add Farming Profile Fields
-- Version: 003
-- Description: Add farming-specific fields to users table for farm management
-- Author: nguyendv
-- Date: 2026-01-13

-- ============================================
-- ADD FARMING-SPECIFIC FIELDS
-- ============================================

-- Farm area in hectares
ALTER TABLE users ADD COLUMN IF NOT EXISTS farm_area NUMERIC(10,2);

-- Main crops grown (comma-separated or JSON)
ALTER TABLE users ADD COLUMN IF NOT EXISTS main_crops TEXT;

-- Years of farming experience
ALTER TABLE users ADD COLUMN IF NOT EXISTS experience_years INTEGER;

-- Farming method (organic, conventional, mixed, etc.)
ALTER TABLE users ADD COLUMN IF NOT EXISTS farming_method VARCHAR(50);

-- Commune/ward administrative ID (for location tracking)
ALTER TABLE users ADD COLUMN IF NOT EXISTS commune_id INTEGER;

-- ============================================
-- ADD CONSTRAINTS
-- ============================================

-- Experience years should be realistic (0-100 years)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_experience_years_check') THEN
    ALTER TABLE users ADD CONSTRAINT users_experience_years_check 
      CHECK (experience_years >= 0 AND experience_years <= 100);
  END IF;
END $$;

-- Farm area should be positive
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_farm_area_check') THEN
    ALTER TABLE users ADD CONSTRAINT users_farm_area_check 
      CHECK (farm_area >= 0);
  END IF;
END $$;

-- Farming method should be from predefined list
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_farming_method_check') THEN
    ALTER TABLE users ADD CONSTRAINT users_farming_method_check 
      CHECK (farming_method IN ('organic', 'conventional', 'mixed', 'hydroponic', 'permaculture', 'other') OR farming_method IS NULL);
  END IF;
END $$;

-- ============================================
-- ADD INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_commune_id ON users(commune_id);
CREATE INDEX IF NOT EXISTS idx_users_farming_method ON users(farming_method);

-- ============================================
-- ADD COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON COLUMN users.farm_area IS 'Farm area in hectares';
COMMENT ON COLUMN users.main_crops IS 'Main crops grown (comma-separated list)';
COMMENT ON COLUMN users.experience_years IS 'Years of farming experience (0-100)';
COMMENT ON COLUMN users.farming_method IS 'Farming method: organic, conventional, mixed, hydroponic, permaculture, other';
COMMENT ON COLUMN users.commune_id IS 'Commune/ward administrative ID for location tracking';
