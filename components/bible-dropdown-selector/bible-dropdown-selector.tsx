import { FormControl } from "@mui/material"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import axios from "axios"
import { useEffect, useState } from "react"
import { Bible } from "types/bible-api"

interface Props {

}

const BibleDropdownSelector = ({

}: Props) => {


    const [loadingBibles, loadingBiblesSetter] = useState(true)

    const [allBibles, allBiblesSetter] = useState<Bible[]>([])


    const [selectedBible, selectedBibleSetter] = useState<Bible>()


    useEffect(() => {
        // fetch bibles
        axios.get('/api/bibles')

        .then(res => {
            allBiblesSetter(res.data)
        })

        .catch(e => {

        })
    }, [])









    // --------------------------------- EVENT HANDLERS ---------------------------------

    function onBibleSelect(event: SelectChangeEvent) {
        const bibleClickedId = event.target.value

        const bibleFound = allBibles.find(bible => bible.id == bibleClickedId)

        if(bibleFound) selectedBibleSetter(bibleFound)
        
    }

    return (
        <>
        <FormControl>
            <InputLabel id="bible-selector-label">Bible</InputLabel>
            <Select
                labelId="bible-selector-label"
                label="Bible"
                style={{
                    backgroundColor: '#fff',
                    width: '100vw',
                    color: '#fff'
                }}
                value={selectedBible ? selectedBible.name : ''}
                onChange={onBibleSelect}
            >
                {
                    allBibles.map((bible, i) => {
                        return <MenuItem value={bible.id}>{bible.name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
        </>
    )
}

export default BibleDropdownSelector
