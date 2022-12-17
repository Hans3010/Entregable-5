import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setTrainerGlobal } from '../store/slices/trainer.slice'


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
    <div>
      <img src="/Home/pokedex.png" alt="" />
      <h1>Hello Trainer!</h1>
      <p>Write your name to start</p>
      <form onSubmit={handleSubmit}>
        <input type="text" id='input'/>
        <button>Start</button>
      </form>
    </div>
  )
}

export default Home