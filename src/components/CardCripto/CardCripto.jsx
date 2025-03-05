import './CardCripto.css';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

export function CardCripto({ agregarFavorito, favoritos }) {
  let { id } = useParams();
  const [dataCripto, setDataCripto] = useState({});
  const [isFav, setIsFav] = useState(false);

  let var1d = dataCripto.priceChange1d;
  let var1w = dataCripto.priceChange1w;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': '1wJXZrLDI8ps436xWG2v5vaQ6eyrBCe63colSHSFu5I='
    }
  };

  const CallAPI = async () => {
    try {
      let response = await fetch(`https://openapiv1.coinstats.app/coins/${id}`, options);
      let data = await response.json();
      
      if (Object.keys(data).length > 0) {
        setDataCripto(data);
        setIsFav(favoritos.some(element => element.id === data.id));
      }
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
    }
  };

  const addfav = () => {
    agregarFavorito(dataCripto);
    setIsFav(!isFav);
  };

 

  const variacionPositiva = (rangoVariacion) => {
    if (rangoVariacion > 0) { 
      return true;
    } else {
      return false;
    }
  };


  useEffect(() => {
    CallAPI();
  }, []);

  return (
    <section className='cont-card'>
      {
        Object.keys(dataCripto).length > 0 && (
          <div key={dataCripto.symbol} className='cont-cripto'>
            <Link className='volver' to='/'><FaRegArrowAltCircleLeft /></Link>
            <MdFavoriteBorder className={`addfav ${isFav ? 'hidden' : ''}`} onClick={addfav} />
            <MdFavorite className={`fav ${!isFav ? 'hidden' : ''}`} onClick={addfav} />
            <div className='cont-left'>
              <img src={dataCripto.icon} className='icon-logo' />
              <h2 className='titulo'>{dataCripto.name}</h2>      
            </div>
            <div className='cont-right'>
              <ul className='info-list'>
                <li className='info'>
                  <h3>Ranking</h3>
                  <h2 className='valor'>{dataCripto.rank}</h2>
                </li>
                <li className='info'>
                  <h3>Precio</h3>
                  <h2 className='valor'>USD {(dataCripto.price).toFixed(2)}</h2>
                </li>
                <li className='info'>
                  <h3>Variacion Diaria</h3>
                  <h2 className={`valor ${variacionPositiva(var1d) ? 'pos' : 'neg'}`}>{dataCripto.priceChange1d} %</h2>
                </li>
                <li className='info'>
                  <h3>Variacion Semanal</h3>
                  <h2 className={`valor ${variacionPositiva(var1w) ? 'pos' : 'neg'}`}>{dataCripto.priceChange1w} %</h2>
                </li>
                <li className='info'>
                  <h3>Web Site</h3>
                  <h2 className='valor'><a className='web' href={dataCripto.websiteUrl} target='_blank'>{dataCripto.websiteUrl}</a></h2>
                </li>
              </ul>
            </div>
          </div>
        )
      }
    </section>
  );
} 
