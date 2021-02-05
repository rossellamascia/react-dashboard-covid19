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
  
  // per aumentare i campi che vuoi renderizzare, basta aumentare numero
  // di stringhe dentro array ( chiaramente attinenti all'endpoint dell'api )

  const dataTrend = ["totale_casi","dimessi_guariti","deceduti","nuovi_positivi"]
 
  //copiato  da StartCard  , viene eseguito dentro Classe APP nel .map di dataTrend
  
  const totalCases = (dati, trend) => {
    if (dati.length > 0) {
        switch (trend) {
            case "totale_casi":
                let totalCases = lastUpdated(dati).map(el => el.totale_casi).reduce((t, n) => t + n);
                return formatNumber(totalCases);
                break;
            case "dimessi_guariti":
                let totalRecovered = lastUpdated(dati).map(el => el.dimessi_guariti).reduce((t, n) => t + n)
                return formatNumber(totalRecovered);
            case "deceduti":
                let totalDeath = lastUpdated(dati).map(el => el.deceduti).reduce((t, n) => t + n)
                return formatNumber(totalDeath);
            case "nuovi_positivi":
                let totalPositive = lastUpdated(dati).map(el => el.nuovi_positivi).reduce((t, n) => t + n)
                return formatNumber(totalPositive);
            default:
                return "errore";
        }
    }
};



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
          {(dati.length>0)  
            ?  dataTrend.map( (x) => {
                return ( 
                <StartCard key={x}   color="bg-accent"dati={dati} nome={dataTrend[x]} numero={totalCases(dati, x)}/>  
                )
              })  
                 
            : <h3>Loading Data...</h3>
          } 
          </div>
      </div>

      <RegionPositive dati={dati} />
    </>
  );
}

export default App;

