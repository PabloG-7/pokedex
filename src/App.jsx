import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import PokemonPage from './pages/PokemonPage/PokemonPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:id" element={<PokemonPage />} />
    </Routes>
  )
}

export default App