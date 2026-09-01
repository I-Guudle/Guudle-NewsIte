-- Fix public form inserts for Guudleitsolutions (publishable / anon key)

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT INSERT (
  full_name, email, phone, company, service, project_type, budget_range,
  message, preferred_contact_method, website, country, source_page, status
) ON TABLE public."Guudleitsolutions" TO anon, authenticated;

-- Needed when id is an identity/serial column
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

ALTER TABLE public."Guudleitsolutions" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "anon_insert_guudleitsolutions"
  ON public."Guudleitsolutions"
  FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_insert_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "authenticated_insert_guudleitsolutions"
  ON public."Guudleitsolutions"
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Keep reads private from the public key
DROP POLICY IF EXISTS "anon_select_guudleitsolutions" ON public."Guudleitsolutions";

DROP POLICY IF EXISTS "authenticated_select_guudleitsolutions" ON public."Guudleitsolutions";
CREATE POLICY "authenticated_select_guudleitsolutions"
  ON public."Guudleitsolutions"
  FOR SELECT
  TO authenticated
  USING (true);

NOTIFY pgrst, 'reload schema';
