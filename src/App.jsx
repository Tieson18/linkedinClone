import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Home from './Pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
