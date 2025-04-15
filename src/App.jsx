import { useContext, useEffect, useState } from 'react'
import './App.css'
import MyContext from './context/MyContext'
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/login/LoginPage"

function App() {
  const [count, setCount] = useState(0)
const {user , setUser} = useContext(MyContext)

  return (
    <main>
    <h1>{user ? <HomePage /> : <LoginPage />}</h1>
    </main>
  )
}

export default App
