import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokeCard from '../components/Pokedex/PokeCard'

const Pokedex = () => {

    const { trainer } = useSelector(state => state)

    const [pokemons, setPokemons] = useState()

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=30`
        axios.get(URL)
        .then(res => setPokemons(res.data.results))
        .catch(err => console.log(err))
    }, [])

  return (
    <div>
        <h1>Welcome {trainer}, here you can find your favorite pokemons! </h1>
        <div className="poke-container">
            {
                pokemons?.map(poke => (
                    <PokeCard 
                    key={poke.url} 
                    url={poke.url}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default Pokedex