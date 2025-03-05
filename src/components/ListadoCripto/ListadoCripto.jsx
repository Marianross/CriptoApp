import { Link } from 'react-router-dom'; 
import './ListadoCripto.css';
import { useEffect, useState } from 'react';


export function ListadoCripto() {

  let [listCriptos, setListCriptos] = useState([]);
  let [limite, setLimite] = useState("10");
  let [nombre, setNombre] = useState("");
   
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': '1wJXZrLDI8ps436xWG2v5vaQ6eyrBCe63colSHSFu5I='
    }
  };

  const URL = "https://openapiv1.coinstats.app/coins";
  const limit = "?limit=" + limite;
  const name = limit + "&name=" + nombre;

  const CallAPI = async (filtro) => {
    try {
      let response = await fetch(URL + filtro, options);
      let data = await response.json();
    
      if (data.result && data.result.length > 0) {
        
        setListCriptos(data.result); 
      }
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    }
  }

  useEffect(() => {
    if (nombre.length > 0) {
      CallAPI(name);
    } else {
      CallAPI(limit);
    }
  }, [limite, nombre]);

  const MostrarMas = () => {
    let nuevoLimite = (parseInt(limite, 10) + 10).toString();
    setLimite(nuevoLimite); 
  };

  const MostrarMenos = () => {
    if (parseInt(limite, 10) > 10) {
      let nuevoLimite = (parseInt(limite, 10) - 10).toString();
      setLimite(nuevoLimite); 
    }
  };



  return (
    <main className='cont-list'>
      <div className='cont-buscar'>
      <input  className='input-buscar' type="text" placeholder='Filtrar por nombre ...' onChange={(e) => setNombre(e.target.value)}/>
      </div>
      <div className='cont-cards'>
      {
        listCriptos.length > 0 &&
        listCriptos.map((cripto) => (
          <Link to={"/cripto/" + cripto.id} className='card-link' key={cripto.id + cripto.name}>
          <div className="card">
          <img src={cripto.icon} alt="logo-cripto" className='logo-cripto' />
          <h2 className='nombre-cripto'>{cripto.name}</h2>
          </div>
          </Link>
        ))
      }
      </div>
      
      <div className='buttons'>
      <a onClick={ () => MostrarMenos() } className='btn-menos'>Mostrar Menos </a>
      <a onClick={ () => MostrarMas() } className='btn-mas'>Mostrar Mas </a>
        
      </div>
    </main>
       
  );
}