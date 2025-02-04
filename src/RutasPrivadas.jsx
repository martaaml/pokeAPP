import { Navigate, Outlet } from 'react-router-dom'
export function RutasPrivadas() {
    let user = false;// Aqui añadiremos la logica de autenticación
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            user = user.uid;
            console.log(user)
        }else{
        console.log("no autenticado")
        }
    });
    return (
        auth? <Outlet /> : <Navigate to="/" />
    )
}