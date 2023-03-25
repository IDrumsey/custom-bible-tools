
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#protecting-api-routes



import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'



export default async function handler(req: NextRequest) {

    console.log('middleware')

    const res = NextResponse.next()

    const supabase = createMiddlewareSupabaseClient({ req, res })

    const {
        data: { session }
    } = await supabase.auth.getSession()


    if(session) {
        return res
    }


    // redirect cuz not authed
    const redirectURL = req.nextUrl.clone()
    redirectURL.pathname = '/auth'
    redirectURL.searchParams.set('redirectedFrom', req.nextUrl.pathname)

    return NextResponse.redirect(redirectURL)
}


export const config = {
    matcher: ['/dashboard', '/posts/new'],
}
