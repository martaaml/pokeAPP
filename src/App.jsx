import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { RutasPrivadas } from './RutasPrivadas';
import { Login } from './components/Login/Login';
import PokemonHangman from './components/Play/Play';
import Pokedex from './components/Pokedex/Pokedex'; 
import Error from './components/Error/Error';
import Detalle from './components/Detalle/Detalle';
import Landing from './components/Landing/Landing';  
function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pokedex">Pokedex</Link>
        <Link to="/login">Login</Link>
        <Link to="/play">Play</Link>
      </nav>
    
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/play" element={<PokemonHangman />} />
        <Route path="/pokedex" element={<Pokedex />} /> 
        <Route path="/error" element={<Error />} />
        <Route path="/detalle/:id" element={<Detalle />} />
 
        {/* Rutas privadas */}
        <Route element={<RutasPrivadas />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
