import Connexion from "./pages/Connexion"
import Navbar from "./components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<App />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App