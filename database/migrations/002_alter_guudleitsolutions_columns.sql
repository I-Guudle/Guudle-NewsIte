-- Alter existing public."Guudleitsolutions" (currently id + created_at only)
-- Run in Supabase SQL Editor, then reload the API schema if prompted.

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

-- Backfill / enforce defaults for new columns
UPDATE public."Guudleitsolutions"
SET
  status = COALESCE(status, 'New'),
  updated_at = COALESCE(updated_at, NOW())
WHERE status IS NULL OR updated_at IS NULL;

ALTER TABLE public."Guudleitsolutions"
  ALTER COLUMN full_name SET NOT NULL,
  ALTER COLUMN email SET NOT NULL,
  ALTER COLUMN message SET NOT NULL,
  ALTER COLUMN status SET DEFAULT 'New',
  ALTER COLUMN status SET NOT NULL,
  ALTER COLUMN updated_at SET DEFAULT NOW();

DO $$
BEGIN
  ALTER TABLE public."Guudleitsolutions"
    DROP CONSTRAINT IF EXISTS guudleitsolutions_status_check;
  ALTER TABLE public."Guudleitsolutions"
    ADD CONSTRAINT guudleitsolutions_status_check
    CHECK (status IN ('New','Contacted','In Progress','Qualified','Converted','Closed','Spam'));
EXCEPTION WHEN others THEN NULL;
END $$;

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
  full_name, email, phone, company, service, project_type, budget_range,
  message, preferred_contact_method, website, country, source_page
) ON TABLE public."Guudleitsolutions" TO anon, authenticated;

GRANT SELECT, UPDATE, DELETE ON TABLE public."Guudleitsolutions" TO authenticated;

DROP POLICY IF EXISTS "anon_insert_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "anon_insert_guudleitsolutions"
  ON public."Guudleitsolutions"
  FOR INSERT
  TO anon
  WITH CHECK (
    COALESCE(status, 'New') = 'New'
    AND archived_at IS NULL
    AND internal_notes IS NULL
  );

DROP POLICY IF EXISTS "anon_select_guudleitsolutions" ON public."Guudleitsolutions";
-- Explicitly no anon SELECT policy (deny by default with RLS enabled)

DROP POLICY IF EXISTS "authenticated_select_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "authenticated_select_guudleitsolutions"
  ON public."Guudleitsolutions" FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_update_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "authenticated_update_guudleitsolutions"
  ON public."Guudleitsolutions" FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "authenticated_delete_guudleitsolutions"
  ON public."Guudleitsolutions" FOR DELETE TO authenticated USING (true);

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
