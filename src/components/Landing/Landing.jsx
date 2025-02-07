import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div className="landing">
      <h1>Welcome to PokeAPI</h1>
      <p>This is a PokeAPI project</p>
      <Link to="/pokemon">Go to Pokemon</Link>
    </div>
  )
}