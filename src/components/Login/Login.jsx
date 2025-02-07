import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAuth, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from 'firebase/auth';
import { app } from '../../firebase';


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login y registro
  const [isModalOpen, setIsModalOpen] = useState(true); // Estado para abrir/cerrar el modal
  const navigate = useNavigate();
  const auth = getAuth(app);

  // Función de inicio de sesión
  const handleLogin = () => {
    if (!email || !password) {
      alert('Por favor ingresa un correo electrónico y una contraseña.');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/pokedex');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorCode} - ${errorMessage}`);
      });
  };

  // Función de registro
  const handleRegister = () => {
    if (!email || !password) {
      alert('Por favor ingresa un correo electrónico y una contraseña.');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/pokedex');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorCode} - ${errorMessage}`);
      });
  };

  // Inicio de sesión con Google
  const signGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        navigate('/pokedex');
      })
      .catch((error) => {
        console.error("Error con Google:", error.message);
      });
  };

  // Inicio de sesión con Facebook
  const signFacebook = () => {
    signInWithPopup(auth, new FacebookAuthProvider())
      .then(() => {
        navigate('/pokedex');
      })
      .catch((error) => {
        console.error("Error con Facebook:", error.message);
      });
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false); // Cambiar el estado para cerrar el modal
  };

  return (
    <div className={`modal fade ${isModalOpen ? 'show d-block' : 'd-none'}`} tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden={!isModalOpen}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* HEADER DEL MODAL */}
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">Autenticación</h5>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close"
              onClick={closeModal} // Usar el estado para cerrar el modal
            ></button>
          </div>

          {/* CUERPO DEL MODAL */}
          <div className="modal-body">
            {/* CONTROLES DE LOGIN/REGISTRO */}
            <div className="d-flex justify-content-around border-bottom pb-2 mb-3">
              <button 
                className={`btn ${!isRegistering ? 'btn-light border' : 'btn-link text-primary'}`} 
                onClick={() => setIsRegistering(false)}
              >
                Iniciar Sesión
              </button>
              <button 
                className={`btn ${isRegistering ? 'btn-light border' : 'btn-link text-primary'}`} 
                onClick={() => setIsRegistering(true)}
              >
                Registrarse
              </button>
            </div>

            {/* FORMULARIO */}
            <div className="text-center">
              <h3 className="mb-4">{isRegistering ? "Regístrate" : "Inicia sesión"}</h3>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                onClick={isRegistering ? handleRegister : handleLogin} 
                className="btn btn-primary w-100 mb-3"
              >
                {isRegistering ? "Registrarse" : "Iniciar Sesión"}
              </button>

              <p>O con tu cuenta de</p>
              <div className="d-flex justify-content-center">
                <button onClick={signGoogle} className="btn mx-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png" width="40" alt="Google" />
                </button>
                <button onClick={signFacebook} className="btn mx-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Facebook_Logo_2023.png" width="40" alt="Facebook" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
