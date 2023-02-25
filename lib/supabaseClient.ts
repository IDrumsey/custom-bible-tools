import { createClient } from '@supabase/supabase-js'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from 'types/supabase'

export const supabaseBase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export const supabase = createBrowserSupabaseClient<Database>()
