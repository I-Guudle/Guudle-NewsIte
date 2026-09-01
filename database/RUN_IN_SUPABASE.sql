-- Guudle IT Solutions — table: "Guudleitsolutions"
-- Project: https://bzscddsgwgauqvfmdooc.supabase.co
-- Public visitors: INSERT only. No SELECT/UPDATE/DELETE for anon/publishable.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public."Guudleitsolutions" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  project_type TEXT,
  budget_range TEXT,
  message TEXT NOT NULL,
  preferred_contact_method TEXT,
  website TEXT,
  country TEXT,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'New'
    CHECK (status IN (
      'New',
      'Contacted',
      'In Progress',
      'Qualified',
      'Converted',
      'Closed',
      'Spam'
    )),
  internal_notes TEXT,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT guudleitsolutions_full_name_len CHECK (char_length(trim(full_name)) >= 2),
  CONSTRAINT guudleitsolutions_email_format CHECK (email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  CONSTRAINT guudleitsolutions_message_len CHECK (char_length(trim(message)) >= 1)
);

CREATE OR REPLACE FUNCTION public.set_guudleitsolutions_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_guudleitsolutions_updated_at ON public."Guudleitsolutions";
CREATE TRIGGER trg_guudleitsolutions_updated_at
  BEFORE UPDATE ON public."Guudleitsolutions"
  FOR EACH ROW
  EXECUTE FUNCTION public.set_guudleitsolutions_updated_at();

CREATE INDEX IF NOT EXISTS idx_guudleitsolutions_email
  ON public."Guudleitsolutions" (lower(email));

CREATE INDEX IF NOT EXISTS idx_guudleitsolutions_status
  ON public."Guudleitsolutions" (status);

CREATE INDEX IF NOT EXISTS idx_guudleitsolutions_service
  ON public."Guudleitsolutions" (service);

CREATE INDEX IF NOT EXISTS idx_guudleitsolutions_created_at
  ON public."Guudleitsolutions" (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_guudleitsolutions_source_page
  ON public."Guudleitsolutions" (source_page);

ALTER TABLE public."Guudleitsolutions" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public."Guudleitsolutions" FROM PUBLIC;
REVOKE ALL ON TABLE public."Guudleitsolutions" FROM anon;
REVOKE ALL ON TABLE public."Guudleitsolutions" FROM authenticated;

GRANT INSERT (
  full_name,
  email,
  phone,
  company,
  service,
  project_type,
  budget_range,
  message,
  preferred_contact_method,
  website,
  country,
  source_page
) ON TABLE public."Guudleitsolutions" TO anon, authenticated;

GRANT SELECT, UPDATE, DELETE ON TABLE public."Guudleitsolutions" TO authenticated;

DROP POLICY IF EXISTS "anon_insert_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "anon_insert_guudleitsolutions"
  ON public."Guudleitsolutions"
  FOR INSERT
  TO anon
  WITH CHECK (
    status = 'New'
    AND archived_at IS NULL
    AND internal_notes IS NULL
    AND char_length(trim(full_name)) >= 2
    AND char_length(trim(message)) >= 1
    AND email ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  );

DROP POLICY IF EXISTS "authenticated_select_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "authenticated_select_guudleitsolutions"
  ON public."Guudleitsolutions"
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "authenticated_update_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "authenticated_update_guudleitsolutions"
  ON public."Guudleitsolutions"
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "authenticated_delete_guudleitsolutions"
  ON public."Guudleitsolutions"
  FOR DELETE
  TO authenticated
  USING (true);

COMMENT ON TABLE public."Guudleitsolutions" IS
  'Guudle website enquiries. Public insert only; admin CRM reads via authenticated role.';
