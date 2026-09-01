-- Guudle IT Solutions — Client inquiry / lead capture (PostgreSQL / Supabase)
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  company_name VARCHAR(200),
  job_title VARCHAR(120),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  country VARCHAR(100),
  preferred_contact VARCHAR(50),
  services JSONB,
  project_title VARCHAR(255),
  project_description TEXT,
  business_objectives TEXT,
  target_audience TEXT,
  current_challenges TEXT,
  desired_features TEXT,
  budget VARCHAR(80),
  timeline VARCHAR(80),
  preferred_tech TEXT,
  existing_url VARCHAR(500),
  additional_notes TEXT,
  file_paths JSONB,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  lead_status VARCHAR(20) NOT NULL DEFAULT 'new'
    CHECK (lead_status IN ('new','contacted','qualified','proposal','closed','spam')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries (email);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (lead_status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries (created_at);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
