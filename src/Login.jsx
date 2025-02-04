import con from './firebase.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleLogin = () => {
        con.auth().signInWithEmailAndPassword(email, password)
        .then(function(user) {
            navigate('/pokemon')
        })
        .catch(function(error) {
            console.log(error)
        })
    }
    return (
        <div className="container">
            <div className="form">
                <h1>Login</h1>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}