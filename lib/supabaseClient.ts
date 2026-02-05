import { createClient } from '@supabase/supabase-js'

// Hardcoded for Cloudflare Pages build (Environment variables not syncing)
const supabaseUrl = 'https://mbbtjoxddnjvevzinupf.supabase.co'
const supabaseAnonKey = 'sb_publishable_CB9s4uqbv6i_FnbAjSsgEA_BKS-N_FO'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
