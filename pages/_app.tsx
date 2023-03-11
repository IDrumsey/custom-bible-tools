import '../styles/globals.css'
import type { AppProps } from 'next/app'


import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session, useUser } from '@supabase/auth-helpers-react'
import { supabase as mySupabaseClient } from '@lib/supabaseClient'
import { montserrat } from '@lib/fonts'
import AuthenticatedCircleIndicator from '@Components/authenticated-circle-indicator/authenticated-circle-indicator'
import Head from 'next/head'


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
    <>
      <Head>
        <title>Bible </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible-icon.svg" />
      </Head>

      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
        <main className={montserrat.className}>
          <Component {...pageProps} />
          {/* {
            user ?

            <div className="signout-btn" onClick={() => signOut()}>Sign Out</div>

            :

            <div className="signin-btn" onClick={() => signIn()}>Sign In</div>
          } */}

          {/* auth indicator */}
          <AuthenticatedCircleIndicator
            style={{
              position: 'absolute',
              right: '25px',
              bottom: '25px'
            }}
          />
        </main>
      </SessionContextProvider>
    </>
  )
}
