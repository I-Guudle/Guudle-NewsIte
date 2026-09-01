-- REQUIRED: run this on table Guudleitsolutions
-- (The table exists but only has id + created_at)

ALTER TABLE public."Guudleitsolutions"
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS service TEXT,
  ADD COLUMN IF NOT EXISTS project_type TEXT,
  ADD COLUMN IF NOT EXISTS budget_range TEXT,
  ADD COLUMN IF NOT EXISTS message TEXT,
  ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS source_page TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New',
  ADD COLUMN IF NOT EXISTS internal_notes TEXT,
  ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

ALTER TABLE public."Guudleitsolutions" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "anon_insert_guudleitsolutions"
  ON public."Guudleitsolutions"
  FOR INSERT
  TO anon
  WITH CHECK (true);

GRANT INSERT (
  full_name, email, phone, company, service, project_type, budget_range,
  message, preferred_contact_method, website, country, source_page, status
) ON TABLE public."Guudleitsolutions" TO anon, authenticated;

GRANT SELECT, UPDATE, DELETE ON TABLE public."Guudleitsolutions" TO authenticated;

DROP POLICY IF EXISTS "authenticated_select_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "authenticated_select_guudleitsolutions"
  ON public."Guudleitsolutions" FOR SELECT TO authenticated USING (true);

NOTIFY pgrst, 'reload schema';
