import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    function logout() {
        localStorage.clear()
        navigate('/login')
    }
    function login() {
        navigate('/login')
    }
    return (
        <nav className='flex p-4'>
            <div className='flex gap-4'>
                <Link to="/">Acceuil</Link>
                <Link to="/login">Login</Link>
                <Link to="/cv">CV</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/admin">Admin</Link>
            </div>
            {token
                ? <button className='mr-4' onClick={logout}>Déconnexion</button>
                : <button className='mr-4' onClick={login}>Connexion</button>
            }
        </nav>
    )
}
