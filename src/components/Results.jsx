import React, { useState, useEffect } from 'react'
import { Box, Heading, SimpleGrid } from "@chakra-ui/react"
import Card from "../components/Card"
import { getPokemon, getAllPokemon } from './services/pokemon';


const Results = ({term}) => {

    const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
      
    }
    fetchData();
  }, [])

  useEffect(()=> {

  }, [term])
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
    setPokemonData(_pokemonData);
  }
    return (
        <div>
            <Box mx="auto" width="90%" marginTop={20}>
                <Heading as="h2"> 

                Results
                </Heading>

                    
                    <div>
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
            <div className="grid-container">
                <SimpleGrid width="100%" minChildWidth="350px" spacing="40px">
                 {pokemonData.map((pokemon, i) => {
                    return <Card key={i} pokemon={pokemon} />
                })}
                </SimpleGrid>
             
            </div>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
          </>
        )}
      </div>
            </Box>
        </div>
    )
}

export default Results
