import { Navigate, Outlet } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react'


export function RutasPrivadas() {
    let [usuario, setUsuario] = useState(null)
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
           setUsuario(<Outlet />)
            console.log(user)
        }else{
       setUsuario(<Navigate to="/Login" />)
        }
    });
    return (
     usuario
    )
}