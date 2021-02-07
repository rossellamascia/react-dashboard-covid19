import React, { useEffect, useState } from 'react';
import './App.css';
import StartCard from "./components/StartCard"
import Header from "./components/Header";
import RegionPositive from "./components/RegionPositive";
import { getSortedData as getSortedDataContagi } from './services/contagi';
import { 
  toPresentationData as toPresentationDataContagi, 
  toSplitRegionsData as toSplitRegionsDataContagi 
} from './transformations/contagi';
import { totalCases, lastUpdated, formatData, totalsForDays } from "./utilities/formatter";


function App() {
  const [hasErrors, setHasErrors] = useState(false);
  const [dati, setDati] = useState({});
  const [data, setData] = useState("");
  const [sortedDati, setSortedDati] = useState([])

  useEffect(() => {
    getSortedDataContagi()
      .then(data => {
        setHasErrors(false);
        const sorted = [...data];

        // transform global data for presentation
        const globalData = toPresentationDataContagi(sorted);
        console.debug(globalData);

        // split data by region and trasform it for presentation
        const regionsData = toSplitRegionsDataContagi(sorted);
        console.debug(regionsData);

        const lastRegion = lastUpdated(sorted);
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
      })
      .catch(error => {
        console.error(error);
        setHasErrors(true);
      });
  }, [])
  
// console.log(sortedDati.totale_casi.map(el => el[1]));

  return (
    <>
      {hasErrors && (
        <div>Si sono verificati degli errori! Ricaricare la pagina.</div>
      )}
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

