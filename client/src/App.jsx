import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Connexion from './pages/Connexion.jsx'
import Home from './pages/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Cv from './pages/Cv.jsx'

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='' element={<Home />} />
                    <Route path='/connexion' element={<Connexion />} />
                    <Route path='/cv' element={<Cv />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
