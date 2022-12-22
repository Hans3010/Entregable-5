import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerGlobal } from '../store/slices/trainer.slice'
import './styles/home.css'


const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerGlobal(e.target.input.value.trim()))
    e.target.reset()
    navigate('/pokedex')
  }

  return (
    <div className='home_container'>
      <img className='home_img' src="/Home/pokedex.png" alt="" />
      <h1 className='home_title'>Hello Trainer!</h1>
      <p className='home_p'>Write your name to start</p>
      <form className='home_form' onSubmit={handleSubmit}>
        <input className='home_input' type="text" id='input'/>
        <button className='home_btn'>Start</button>
      </form>
    </div>
  )
}

export default Home