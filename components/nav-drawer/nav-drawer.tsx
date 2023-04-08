import styles from './_nav-drawer.module.scss'
import { Drawer, Box } from '@mui/material'
import { Fragment, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'

type Props = {

}

const NavDrawer = ({

}: Props) => {

    const [showingNav, showingNavSetter] = useState(false)


    function onToggleBtnClick() {
        showingNavSetter(prevState => !prevState)
    }

    return (
        <div>
            <Fragment>
                <MenuIcon id={styles['nav-toggle-btn']} onClick={e => onToggleBtnClick()}/>

                <Drawer
                    anchor='left'
                    open={showingNav}
                    onClose={() => showingNavSetter(false)}
                    PaperProps={{
                        sx: {
                            backgroundColor: '#0f1524',
                            fontFamily: 'Montserrat'
                        }
                    }}
                >
                    <Box>
                        <Link className={styles['nav-link']} href="/">Home</Link>
                    </Box>

                    <Box>
                        <Link className={styles['nav-link']} href="/dashboard">Dashboard</Link>
                    </Box>

                    <Box>
                        <Link className={styles['nav-link']} href="/explore">Explore</Link>
                    </Box>

                    <Box>
                        <Link className={styles['nav-link']} href="/posts/new">Create New Post</Link>
                    </Box>
                </Drawer>
            </Fragment>
        </div>
    )
}

export default NavDrawer