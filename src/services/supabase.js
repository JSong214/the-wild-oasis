import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ikypotzholhkfnlyyues.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlreXBvdHpob2xoa2ZubHl5dWVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMzc5NDEsImV4cCI6MjA2MjYxMzk0MX0.SfdoNn1F8lDUztGgvvvsv7AvmXxWrYjqVTFf1KT3FDk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
