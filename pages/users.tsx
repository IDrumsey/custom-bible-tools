import supabase from "@lib/supabase-browser"
import { useEffect, useState } from "react"
import Link from 'next/link'

interface Props {

}

const UsersPage = ({

}: Props) => {

    const [users, usersSetter] = useState<any[]>([])

    useEffect(() => {

        const handleLoad = async() => {
            const { data } = await supabase.from('profiles').select()
            if(data) {
                usersSetter(data)
            }
        }

        handleLoad()

    }, [])

    return (
        <>
        {
            users && users.map((user, i) => {
                return (
                    <Link href={`/profiles/${user.id}`} key={i}>
                        {user.first_name} {user.last_name}
                    </Link>
                )
            })
        }
        </>
    )
}

export default UsersPage