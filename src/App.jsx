import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { RutasPrivadas } from './RutasPrivadas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Link to="/">Home</Link>
    <Route element={<RutasPrivadas/>}>
    <Link to="/pokemon">Pokemon</Link>
    </Route>
    <Routes>
    <Route exact path="/" element={<Login/>} />
    <Route exact path="/pokemon" element={<Pokemon/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App