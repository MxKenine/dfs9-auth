import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const repsonse = await fetch('http://localhost:3000/login-localstorage', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            const data = await repsonse.json()
            localStorage.setItem('token', data.token)
            localStorage.setItem('role', data.role)
            console.log(data)
            if (data.role === 'admin') {
                navigate('/admin')
            }
            if (data.role === 'user') {
                navigate('/profile')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Mot de passe..." onChange={(e) => setPassword(e.target.value)} />
                <button>Connexion</button>
                <Link to='/register'>Inscription</Link>
            </form>
        </main>
    )
}