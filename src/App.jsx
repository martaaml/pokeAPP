import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { RutasPrivadas } from './RutasPrivadas';
import { Login } from './components/Login/Login';
import PokemonHangman from './components/Play/Play';
import Pokedex from './components/Pokedex/Pokedex'; 
import Error from './components/Error/Error';
import Detalle from './components/Detalle/Detalle';
import Landing from './components/Landing/Landing';  
import { auth } from './firebase'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import fondo from './assets/images/fondo.png';

function App() {
  const [user, setUser] = useState(null);

  // Comprobamos el estado de la sesión del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Si el usuario está logueado, guardamos los datos
      } else {
        setUser(null); // Si no hay usuario, lo dejamos como null
      }
    });

    // Limpiamos la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return (
    
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/pokedex">Pokedex</Link>
        {!user && <Link to="/login">Login</Link>}
        {user && (
          <>
            <Link to="/play">Play</Link>
            <button class="nav-link" onClick={() => auth.signOut()}>Cerrar sesión</button> 
          </>
        )}
      </nav>
    
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/login" element={<Login />} />
        
        {/* Ruta protegida */}
        <Route element={<RutasPrivadas />}>
          <Route path="/play" element={<PokemonHangman />} />
        </Route>

        <Route path="/pokedex" element={<Pokedex />} /> 
        <Route path="/error" element={<Error />} />
        <Route path="/detalle/:id" element={<Detalle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
