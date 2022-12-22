import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pokedex/Pagination'
import PokeCard from '../components/Pokedex/PokeCard'
import './styles/pokedex.css'

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
            const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=100`
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

    const [page, setPage] = useState(1)
    const [pokePerPage, setpokePerPage] = useState(12)
    const initialPoke = (page - 1) * pokePerPage
    const finalPoke = page * pokePerPage
    const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage)

  return (
    <div>
        <header className='pokedex_header'>
            <div className='header_container'>
                <div className='header_color1'>
                    <a href="#/pokedex">
                        <img className='header_img' src="/Home/pokedex.png"  />
                    </a>
                <div className='header_color2'></div>    
                </div>
            </div>
        <h1 className='pokedex_h1'><span className='pokedex_span'>Welcome {trainer},</span> here you can find your favorite pokemons! </h1>
        </header>
        <section className='pokedex_section'>      
        <form className='pokedex_form' onSubmit={handleSubmit} action="">
            <input className='pokedex_input' id='input' type="text" />
            <button className='pokedex_btn'>Search</button>
        </form>
        <select className='pokedex_select' onChange={handleChange}>
            <option value='All pokemons'>All pokemons</option>
            {
                types?.map(type => (
                    <option key={type.url} value={type.url}>{type.name}</option>
                ))
            }
        </select>
        </section>
        <div className="pagination_container">
        <Pagination 
        page={page}
        maxPage={maxPage}
        setPage={setPage}/>
        </div>     
        <div className="poke_container">
            {
                pokemons?.slice(initialPoke, finalPoke).map(poke => (
                    <PokeCard 
                    key={poke.url} 
                    url={poke.url}
                    />
                ))
            }
        </div>
        <div className="pagination_container">
        <Pagination 
        page={page}
        maxPage={maxPage}
        setPage={setPage}/>
        </div>  
    </div>
  )
}

export default Pokedex