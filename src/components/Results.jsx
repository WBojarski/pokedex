import React, { useState, useEffect } from 'react'
import { Box, Heading, SimpleGrid, Button, Center, Input, Image } from "@chakra-ui/react"
import Card from "../components/Card"
import { getPokemon, getAllPokemon } from './services/pokemon';
import logo from "../img/logo.png"


const Results = ({ term }) => {
  const [initialData, setInitialData] = useState([])
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("")

  const initialURL = 'https://pokeapi.co/api/v2/pokemon?limit=200&offset=0'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
      console.log()

    }
    fetchData();

  }, [])

  useEffect(() => {
    if (searchTerm) {
      let filteredData = initialData.filter(pokemon => pokemon.name.includes(searchTerm))
      setPokemonData(filteredData)
      console.log(pokemonData)

    } else {
      setPokemonData(initialData)
    }

  }, [searchTerm])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setInitialData(_pokemonData)
    setPokemonData(_pokemonData);
    console.log(pokemonData)
  }



  return (
    <div>
      <Box mx="auto" width="90%" marginTop={20}>
        <Image mx="auto" src={logo} alt="" />
        <div>
          <Center marginTop={14} display="flex" flexDirection="column">
            <Input variant="flushed" width="40%" outline="none" padding="10px" outlineOffset="none" border="2px solid #ced4da " color="gray" borderRadius="10px" onChange={e => setSearchTerm(e.target.value)} placeholder="Type in search term" />
            <Heading as="h2" marginTop={14}>
              Results
            </Heading>
          </Center>
          {!loading && <>
            <Box mx="auto" width="90%" marginTop={20}>
            </Box>
            <div className="btn">
              <Button colorScheme="blue" onClick={prev}>Prev</Button>
              <Button colorScheme="blue" marginLeft="10px" onClick={next}>Next</Button>
            </div>
            <div className="grid-container">
              <SimpleGrid width="100%" columns minChildWidth="350px" spacing="20px">

                {pokemonData.map((pokemon, i) => {
                  return <Card key={i} pokemon={pokemon} />
                })}
              </SimpleGrid>
            </div>
            <div className="btn">
              <Button colorScheme="blue" onClick={prev}>Prev</Button>
              <Button colorScheme="blue" marginLeft="10px" onClick={next}>Next</Button>
            </div>
          </>
          }
          {loading && <h1 style={{ textAlign: 'center' }}>Loading...</h1>}


        </div>
      </Box>
    </div>
  )
}

export default Results
