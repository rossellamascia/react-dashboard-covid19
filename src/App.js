import React, { useEffect, useState } from 'react';
import './App.css';
import StartCard from "./componets/StartCard"
import Header from "./componets/Header";
import RegionPositive from "./componets/RegionPositive";

//array al contrario
export const sortedArray = (dati) => [...dati].reverse()
//formatto i dati per una maggiore chiarezza
export const formatNumber = (num) => new Intl.NumberFormat('it-IT').format(num)

export const lastUpdated = (dati) => {
  if (dati.length > 0) {
    let sorted = sortedArray(dati)
    // ultima data caricata
    let lastUpdated = sorted[0].data
    // regione con più casi
    let lastUpdatedData = sorted.filter(el => el.data === lastUpdated).sort((a, b) => b.nuovi_positivi - a.nuovi_positivi)
    return lastUpdatedData
  }
}

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
      <div className="container margin-top-70">
        <div className="row">
          <StartCard dati={dati} name="Casi totali" color="bg-accent" dataTrend="totale_casi" />
          <StartCard dati={dati} name="Guariti totali" color="bg-success" dataTrend="dimessi_guariti" />
          <StartCard dati={dati} name="Morti totali" color="bg-danger" dataTrend="deceduti" />
          <StartCard dati={dati} name="Nuovi casi" color="bg-warning" dataTrend="nuovi_positivi" />
        </div>
      </div>

      <RegionPositive dati={dati} />
    </>
  );
}

export default App;

