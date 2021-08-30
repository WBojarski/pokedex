import React, { useState, useEffect } from 'react'
import { Input, Box, Center } from "@chakra-ui/react"
import Results from "../components/Results"

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div>
            <Box mx="auto" width="90%" marginTop={20}>
                <Center>
                    <Input variant="flushed" width="40%" onChange={e => console.log(e.target.value)} border="2px solid black" placeholder="Type in search term"/>   
                </Center>
            <Results term={searchTerm}/>
            </Box>
        </div>
    )
}

export default Search
