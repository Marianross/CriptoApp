import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { ListadoCripto } from './components/ListadoCripto/ListadoCripto';
import { CardCripto } from './components/CardCripto/CardCripto';
import { Header } from './components/Header/Header';
import { Favoritos } from './components/Favoritos/Favoritos';
import './App.css';

function App() {
  const [addFavoritos, setAddFavoritos] = useState([]);
  const [modo, setModo] = useState("claro");



const cambiarModo = () => {
  setModo(modo === "claro" ? "oscuro" : "claro");
} 

  let agregarFavorito = (cripto) => {
    let listaFavoritos = [...addFavoritos];
    if (listaFavoritos.find((element) => element.id === cripto.id)) {
      listaFavoritos = listaFavoritos.filter(element => element.id !== cripto.id);
      setAddFavoritos(listaFavoritos);
    } else {
      listaFavoritos.push(cripto);
      setAddFavoritos(listaFavoritos);
    }
  };

let cantFav = addFavoritos.length;

  return (
    <div className={modo} >
      <Header cambiarModo={cambiarModo} modo={modo} cantFav={cantFav} />
      <Routes>
        <Route path="/" element={<ListadoCripto />} />
        <Route path="/cripto/:id" element={<CardCripto agregarFavorito={agregarFavorito} favoritos={addFavoritos} />} />
        <Route path="/favoritos" element={<Favoritos addFavoritos={addFavoritos} />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App