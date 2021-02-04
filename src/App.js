import React, { useEffect, useState } from 'react';
import './App.css';
import StartCard from "./componets/StartCard"  
import Header from "./componets/Header";

function App() {
  const [dati, setDati] = useState([]);

  useEffect(() => {
    const getDati = async () => {
      const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
      const jsResponse = await response.json();
      setDati(jsResponse);
    }
    getDati();
  }, [])

  
  return (
    <>
      <Header dati={dati} />
      <StartCard dati={dati} />
    </>
  );
}

export default App;

//array al contrario
export const sortedArray = (dati) => [...dati].reverse()
//formatto i dati per una maggiore chiarezza
export const formatNumber = (num) => new Intl.NumberFormat('it-IT').format(num)