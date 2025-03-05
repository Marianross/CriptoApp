import { Link } from 'react-router-dom';
import './Favoritos.css';
import { useState } from 'react';

export function Favoritos({ addFavoritos }) {

  const [nombre, setNombre] = useState("");
  const favoritos = addFavoritos;

  const filtrarCriptos = favoritos.filter(cripto =>
    cripto.name.toLowerCase().includes(nombre.toLowerCase())
  );

  return (
    <section className='cont-list-fav'>
      <div className='cont-buscar'>
        <input
          className='input-buscar'
          type="text"
          placeholder='Filtrar por nombre ...'
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className='cont-cards-fav'>
        {
          favoritos.length > 0 ?  
          filtrarCriptos.length > 0 ? (
            filtrarCriptos.map((cripto) => (
              <Link to={"/cripto/" + cripto.id} className='card-link' key={cripto.id + cripto.name}>
                <div className="card">
                  <img src={cripto.icon} alt="logo-cripto" className='logo-cripto' />
                  <h2 className='nombre-cripto'>{cripto.name}</h2>
                </div>
              </Link>
            ))
          ) : (
            <h1 className='mensaje'>No se encontraron criptomonedas con ese nombre</h1>
          )
          : <h1 className='mensaje'>No hay criptomonedas en favoritos</h1>
        }
      </div>
    </section>
  );
}    
  