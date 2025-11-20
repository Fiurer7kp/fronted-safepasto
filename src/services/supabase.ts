import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'http://localhost';
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);