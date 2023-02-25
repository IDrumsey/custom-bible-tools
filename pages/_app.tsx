import '../styles/globals.css'
import type { AppProps } from 'next/app'


import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session, useUser } from '@supabase/auth-helpers-react'
import { supabase as mySupabaseClient } from '@lib/supabaseClient'


export default function App({ Component, pageProps }: AppProps<{initialSession: Session}>) {

  const [supabase] = useState(() => createBrowserSupabaseClient())
  
  async function signOut() {
    const { error } = await mySupabaseClient.auth.signOut()
  }

  const user = useUser()

  function signIn() {
    console.log('signing in')
  }
  
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
      {
        user ?

        <div className="signout-btn" onClick={() => signOut()}>Sign Out</div>

        :

        <div className="signin-btn" onClick={() => signIn()}>Sign In</div>
      }
    </SessionContextProvider>
  )
}
