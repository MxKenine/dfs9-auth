import React from 'react'
import { useState } from 'react'

export default function Connexion() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(email, password)
        const repsonse = await fetch('http://localhost:3000/login-localstorage', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const data = await repsonse.json()
        localStorage.setItem('token', data.token)
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mot de passe..." onChange={(e) => setPassword(e.target.value)} />
            <button>Connexion</button>
        </form>
    )
}