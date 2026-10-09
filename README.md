# Harbour Light onboarding portal
1. Supabase > SQL Editor: paste supabase.sql, Run.
2. Vercel > Settings > Environment Variables (all required):
   SUPABASE_URL, SUPABASE_SERVICE_KEY (Supabase > Project Settings > API, use the service_role key),
   RESEND_API_KEY, ADMIN_EMAIL (your admin sign-in email), ADMIN_PASSWORD (choose a long one), SITE_URL (your live address, no trailing slash).
3. Redeploy. Admin: SITE_URL/admin
