import React, { useEffect, useState } from 'react';
import './App.css';
import StartCard from "./componets/StartCard"
import Header from "./componets/Header";
import RegionPositive from "./componets/RegionPositive";
import { formatNumber, lastUpdated, formatData } from "./componets/utility";

const totalCases = (datiToday, trend) => {
  if (datiToday.length > 0) {
    let totalCases = datiToday.map(el => el[trend]).reduce((t, n) => t + n);
    return formatNumber(totalCases);
  }
}

function App() {
  const [dati, setDati] = useState({});
  const [data, setData] = useState("");

  useEffect(() => {
    const getDati = async () => {
      const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json');
      const jsResponse = await response.json();
      const sorted = lastUpdated(jsResponse)
      const datiOk = {
        totale_casi: totalCases(sorted, "totale_casi"),
        dimessi_guariti: totalCases(sorted, "dimessi_guariti"),
        deceduti: totalCases(sorted, "deceduti"),
        nuovi_positivi: totalCases(sorted, "nuovi_positivi")
      }
      setData(formatData(sorted.pop().data))
      setDati(datiOk);
    }
    getDati();
  }, [])



  return (
    <>
      <Header data={data} />
      <div className="container margin-top-70">
        <div className="row">
          <StartCard dati={dati.totale_casi} name="Casi totali" color="bg-accent"  />
          {/* <StartCard dati={dati.dimessi_guariti} name="Guariti totali" color="bg-success"  />
          <StartCard dati={dati.deceduti} name="Morti totali" color="bg-danger"  />
          <StartCard dati={dati.nuovi_positivi} name="Nuovi casi" color="bg-warning"  /> */}
        </div>
      </div>

      <RegionPositive dati={dati} />
    </>
  );
}

export default App;

