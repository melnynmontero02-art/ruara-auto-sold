-- ============================================
-- RUARA AUTO SOLD - SUPABASE SETUP
-- ============================================
-- Ejecuta este SQL en tu proyecto Supabase
-- Settings > SQL Editor > New Query
-- ============================================

-- 1. TABLA: vehicles
DROP TABLE IF EXISTS vehicles CASCADE;
CREATE TABLE vehicles (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL,
  price BIGINT NOT NULL,
  initial BIGINT NOT NULL,
  fuel TEXT DEFAULT 'Gasolina',
  transmission TEXT DEFAULT 'Automático',
  mileage TEXT NOT NULL,
  type TEXT NOT NULL,
  image TEXT NOT NULL,
  fallback TEXT,
  tag TEXT DEFAULT 'DISPONIBLE',
  color TEXT,
  seats TEXT,
  verified BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE
);

-- 2. TABLA: leads
DROP TABLE IF EXISTS leads CASCADE;
CREATE TABLE leads (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  vehicle_interest TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE
);

-- 3. TABLA: stats
DROP TABLE IF EXISTS stats CASCADE;
CREATE TABLE stats (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  key TEXT UNIQUE NOT NULL,
  value INT DEFAULT 0
);

-- 4. Insertar stats iniciales
INSERT INTO stats (key, value) VALUES 
  ('total_sold', 500),
  ('partner_banks', 8),
  ('approval_rate', 98),
  ('years_experience', 5)
ON CONFLICT (key) DO NOTHING;

-- 5. Crear índices
CREATE INDEX idx_vehicles_active ON vehicles(is_active);
CREATE INDEX idx_vehicles_tag ON vehicles(tag);
CREATE INDEX idx_leads_created ON leads(created_at);
CREATE INDEX idx_leads_read ON leads(is_read);

-- 6. RLS (Row Level Security)
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Política: vehicles (pública lectura, admin escritura)
CREATE POLICY "vehicles_read" ON vehicles 
  FOR SELECT USING (is_active = true);

-- Política: leads (insertar público, leer admin)
CREATE POLICY "leads_insert" ON leads 
  FOR INSERT WITH CHECK (true);

-- Política: stats (pública lectura)
CREATE POLICY "stats_read" ON stats 
  FOR SELECT USING (true);

-- ============================================
-- ✅ LISTO
-- ============================================
-- Ahora ve a tu proyecto Vercel y:
-- 1. Copia .env.local (creado en el proyecto)
-- 2. Deploy a Vercel
-- 3. Accede a /admin para loguinearte
-- Email: admin@ruara.com
-- Contraseña: Ruara2024!Admin
-- ============================================
