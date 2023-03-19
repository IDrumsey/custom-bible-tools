

import styles from '@Styles/_explore.module.scss'
import Link from 'next/link'


type Props = {

}

const NewComponent = ({

}: Props) => {

    return (
        <>
        
        {/* some featured posts should go here */}


        {/* btn to explore users */}
        <button><Link href='/users'>Users</Link></button>

        </>
    )
}

export default NewComponent
