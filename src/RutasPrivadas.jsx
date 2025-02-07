import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, Outlet } from 'react-router-dom';

export function RutasPrivadas() {
  const [usuario, setUsuario] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    // Agregar el listener de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(true); // Usuario autenticado
      } else {
        setUsuario(false); // Usuario no autenticado
      }
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, [auth]);

  if (usuario === null) {
    // Mientras no se sepa si el usuario está autenticado o no, no renderizar nada (por ejemplo, se puede mostrar un cargando)
    return <div>Loading...</div>;
  }

  return usuario ? <Outlet /> : <Navigate to="/login" />;
}
