import React, { useEffect, useState } from 'react';
import './App.css';
import StartCard from "./componets/StartCard"
import Header from "./componets/Header";
import RegionPositive from "./componets/RegionPositive";
import { totalCases, lastUpdated, formatData, sortedArray,totalsForDays } from "./componets/utility";


function App() {
  const [dati, setDati] = useState({});
  const [data, setData] = useState("");
  const [sortedDati, setSortedDati] = useState([])

  useEffect(() => {
    const getDati = async () => {
      const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
      const jsResponse = await response.json();
      const lastRegion = lastUpdated([...jsResponse])
      const sorted = sortedArray([...jsResponse])
      const total = {
        totale_casi: totalsForDays(sorted, "totale_casi"),
        dimessi_guariti: totalsForDays(sorted, "dimessi_guariti"),
        deceduti: totalsForDays(sorted, "deceduti"),
        nuovi_positivi: totalsForDays(sorted, "nuovi_positivi")
      }
      const datiOk = {
        totale_casi: totalCases(lastRegion, "totale_casi"),
        dimessi_guariti: totalCases(lastRegion, "dimessi_guariti"),
        deceduti: totalCases(lastRegion, "deceduti"),
        nuovi_positivi: totalCases(lastRegion, "nuovi_positivi")
      }
      setSortedDati(total)
      setData(formatData(lastRegion.pop().data))
      setDati(datiOk);
    }
    getDati();
  }, [])
  
// console.log(sortedDati.totale_casi.map(el => el[1]));

  return (
    <>
      <Header data={data} />
      <div className="container margin-top-70">
        <div className="row">
          <StartCard dati={dati.totale_casi} name="Casi totali" color="bg-accent" sortedDati={sortedDati.totale_casi} />
          <StartCard dati={dati.dimessi_guariti} name="Guariti totali" color="bg-success" sortedDati={sortedDati} />
          <StartCard dati={dati.deceduti} name="Morti totali" color="bg-danger" sortedDati={sortedDati} />
          <StartCard dati={dati.nuovi_positivi} name="Nuovi casi" color="bg-warning" sortedDati={sortedDati} />
        </div>
      </div>

      <RegionPositive dati={dati} />
    </>
  );
}

export default App;

