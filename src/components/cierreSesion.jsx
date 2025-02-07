// CierreSesion.jsx
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; 
import { useHistory } from "react-router-dom";

const CierreSesion = () => {
    const history = useHistory();

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Sesión cerrada correctamente");
                history.push("/"); // Redirige a la página de inicio o login
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    };

    return (
        <button onClick={handleLogout}>Cerrar sesión</button>
    );
};

export default CierreSesion;
