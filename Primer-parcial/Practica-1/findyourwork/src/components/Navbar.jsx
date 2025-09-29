import { Link } from "react-router-dom"
export function Navbar() {
    return(
        <nav>
            <ul>
                <li><Link to='/'>Inicio</Link></li>
                <li><Link to='/Login'>Iniciar Sesion</Link></li>
                <li><Link to='/SingUp'>Registrarse</Link></li>
            </ul>
        </nav>
    )
}