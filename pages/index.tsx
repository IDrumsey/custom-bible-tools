import Head from 'next/head'
import Image from 'next/image'
import { Inter, Montserrat } from '@next/font/google'
import BibleDropdownSelector from 'components/bible-dropdown-selector/bible-dropdown-selector'

import styles from '@Styles/_index.module.scss'
import SignInForm from '@Components/login/login'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 id={styles['title']}>Custom Bible Tools</h1>
      <p id={styles['description']}>Built as a tool to help you study the Bible.</p>

      <div id={styles['btns-wrapper']}>
        <div id={styles['explore-btn']} className={styles['btn']}><Link className={styles['btn-link']} href='/explore'>Explore</Link></div>
        <div id={styles['signup-btn']} className={styles['btn']}><Link className={styles['btn-link']} href='/auth'>Sign Up</Link></div>
        <div id={styles['signin-btn']} className={styles['btn']}><Link className={styles['btn-link']} href='/auth'>Sign In</Link></div>
      </div>
    </>
  )
}
