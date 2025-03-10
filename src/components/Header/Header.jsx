import { Link } from 'react-router-dom';
import './Header.css';
import { MdLightMode, MdDarkMode } from "react-icons/md";

export function Header({ cambiarModo, modo, cantFav }) {


  return (
    <header className='header'>
      <div className='cont-logo'>
        <img className='logo' src="logo.png" alt="Logo" />
        <h1>CRIPTO TRACKER</h1>
      </div>
      <div className='cont-header'>
        <nav className='nav'>
         <Link to='/' className='button'>
           LISTADO DE CRIPTOMONEDAS
         </Link>
         <Link to='/favoritos' className='button'>
           FAVORITOS + {cantFav}
         </Link>
        </nav>
      <div className={`cont-modo ${modo === "oscuro" ? "hidden" : ""}`}
        onClick={cambiarModo}>
      <MdLightMode
        className='modo-claro'
        
      />
      </div>
      <div className={`cont-modo ${modo === "claro" ? "hidden" : ""}`}
        onClick={cambiarModo}>
      <MdDarkMode
        className='modo-oscuro'
      />
      </div>
      </div>
    </header>
  );
}