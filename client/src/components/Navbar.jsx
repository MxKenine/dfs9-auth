import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/connexion">Connexion</Link>
            <Link to="/cv">CV</Link>
        </nav>
    )
}
