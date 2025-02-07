import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div id='error'>
      <p className='error'>404</p>
      <h1 className='error'>Error</h1>
      <p className='error'>La página que buscas no existe</p>
      <Link className='link' to="/">GO BACK</Link>
    </div>
  )
}