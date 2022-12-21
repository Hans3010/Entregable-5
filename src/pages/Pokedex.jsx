import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'

const Pokedex = () => {

    const { trainer } = useSelector(state => state)

    const [pokemons, setPokemons] = useState()
    const [types, setTypes] = useState()
    const [typeSelect, setTypeSelect] = useState('All pokemons')

    const navigate = useNavigate()

    useEffect(() => {
        if(typeSelect !== 'All pokemons'){
            axios.get(typeSelect)
            .then(res => setPokemons(res.data.pokemon.map(e => e.pokemon)))
            .catch(err => console.log(err))
        } else {
            const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=30`
            axios.get(URL)
            .then(res => setPokemons(res.data.results))
            .catch(err => console.log(err))
        }    
    }, [typeSelect])
    
    useEffect(() => {
        const URL = 'https://pokeapi.co/api/v2/type'
        axios.get(URL)
        .then(res => setTypes(res.data.results))
        .catch(err => console.log(err))
    }, [])
    

    const handleSubmit = e => {
        e.preventDefault()
        const inp = e.target.input.value.trim().toLowerCase()
        navigate(`/pokedex/${inp}`)
    }

    const handleChange = e => {
        setTypeSelect(e.target.value)
    }

    //Paginacion

    const [page, setPage] = useState(2)
    const [pokePerPage, setpokePerPage] = useState(9)
    const initialPoke = (page - 1) * pokePerPage
    const finalPoke = page * pokePerPage
    const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)

  return (
    <div>
        <h1>Welcome {trainer}, here you can find your favorite pokemons! </h1>
        <form onSubmit={handleSubmit} action="">
            <input id='input' type="text" />
            <button>Search</button>
        </form>
        <select onChange={handleChange}>
            <option value='All pokemons'>All pokemons</option>
            {
                types?.map(type => (
                    <option key={type.url} value={type.url}>{type.name}</option>
                ))
            }
        </select>
        <Pagination 
        page={page}
        maxPage={maxPage}
        setPage={setPage}
        />
        <div className="poke-container">
            {
                pokemons?.slice(initialPoke, finalPoke).map(poke => (
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