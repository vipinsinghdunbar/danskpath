import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bjmInpsmalerfbfcynqz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_9xEoVxCL7Cg8ASSuchnvUA_A2I-L';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
