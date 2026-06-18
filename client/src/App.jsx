import { useState } from "react"


function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    const repsonse = await fetch('http://localhost:3000/login-localstorage', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
    console.log(response)
    const data = await repsonse.json()
    localStorage.setItem('token', data.token)
    console.log(data)
  }
  return (
    <>
      <form>
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)} />
        <input
          type="password"
          placeholder="Mot de passe..."
          onChange={(e) => setPassword(e.target.value)} />
        <button>Connexion</button>
      </form>
    </>
  )
}
export default App