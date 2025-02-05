import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { RutasPrivadas } from './RutasPrivadas'
import {Login} from './Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/pokemon">Pokemon</Link>
      <Link to="/login">Login</Link>
    </nav>
    
    <Routes>
      <Route path="/Login" element={<Login />} />
      
      {/* Rutas privadas */}
      <Route element={<RutasPrivadas />}>
      
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App