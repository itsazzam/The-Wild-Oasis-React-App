import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xlsuuycenmbfasnlnxip.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsc3V1eWNlbm1iZmFzbmxueGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAxMTYyMjIsImV4cCI6MjAyNTY5MjIyMn0.CTD98ddd6-Me9PGtir7mlamo36pCepEVvQWha3cGx6c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
