import './App.css'
import { Navbar } from './components/Navbar'
import { Services } from './components/Services'
import { Routes, Route } from 'react-router-dom';
import { Perfilpage } from './pages/PerfilPage';
import { LoginPage } from './pages/LoginPages';
import { RegistrarsePages } from './pages/singup';

function App() {
  return (

    <div>
      <Navbar />
      <h1>Encuentra tu trabajo</h1>

      <Routes>
        <Route path="/" element={<Services />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/SingUp" element={<RegistrarsePages />} />
        <Route path="/perfil" element={<Perfilpage />} />
      </Routes>

    </div>

    
    
  )
}

export default App
