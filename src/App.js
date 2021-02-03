import React, { useEffect, useState } from 'react';
import './App.css';
// import _ from "lodash";

// import Header from "./componets/Header";

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

  //array al contrario
  const sortedArray = (dati) => {
    let sorted = [...dati].reverse()
    return sorted
  }

  const formatData = dati => {
    if (dati.length > 0) {
      let sorted = sortedArray(dati)
      let lastUpdated = sorted[0].data
      let lastUpdatedFormatted = lastUpdated
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
      return lastUpdatedFormatted
    }
  };
  //formatto i dati per una maggiore chiarezza
  const formatNumber = (num) => new Intl.NumberFormat('it-IT').format(num)
  


  const totalCases = dati => {
    if (dati.length > 0) {
      let sorted = sortedArray(dati)
      // ultima data caricata
      let lastUpdated = sorted[0].data
      // regione con più casi
      let lastUpdatedData = sorted.filter(el => el.data === lastUpdated).sort((a, b) => b.nuovi_positivi - a.nuovi_positivi)
      // totale casi
      let totalCases = lastUpdatedData.map(el => el.totale_casi).reduce((t, n) => t + n)
      return formatNumber(totalCases)
    }
  };



  return (
    <>
      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12">
              <h1 className="text-white mb-0">Covid 19 - Dashboard</h1>
              <p className="small text-white mb-2 ">Fonte Protezione Civile</p>
              <p className="text-white fs-5">Dati aggiornati al: {formatData(dati)}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="container margin-top-70">
        <div className="row">
          <div className="col-12 col-md-3 mb-4">
            <div className="card-custom rounded-3 d-flex flex-column h-100 bg-accent text-white"
              data-trend="totale_casi">
              <p className="ms-3 fs-4 mt-3 fw-light mb-0">Casi totali</p>
              <p id="totalCases" className="fs-3 ms-3 pe-3 text-white fw-bolder">{totalCases(dati)}</p>
              <hr className="text-white mt-0" />
              <p className="text-white ms-3">scopri di più</p>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="card-custom rounded-3 d-flex flex-column h-100 bg-success text-white"
              data-trend="dimessi_guariti">
              <p className="ms-3 fs-4 mt-3 fw-light mb-0">Guariti totali</p>
              <p id="totalRecovered" className="fs-3 ms-3 pe-3 text-white fw-bolder"></p>
              <hr className="text-white mt-0" />
              <p className="text-white ms-3">scopri di più</p>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="card-custom rounded-3 d-flex flex-column h-100 bg-danger text-white" data-trend="deceduti">
              <p className="ms-3 fs-4 mt-3 fw-light mb-0">Morti totali</p>
              <p id="totalDeath" className="fs-3 ms-3 pe-3 text-white fw-bolder"></p>
              <hr className="text-white mt-0" />
              <p className="text-white ms-3">scopri di più</p>
            </div>
          </div>
          <div className="col-12 col-md-3 mb-4">
            <div className="card-custom rounded-3 d-flex flex-column h-100 bg-warning text-white"
              data-trend="nuovi_positivi">
              <p className="ms-3 fs-4 mt-3 fw-light mb-0">Nuovi casi</p>
              <p id="totalPositive" className="fs-3 ms-3 pe-3 text-white fw-bolder"></p>
              <hr className="text-white mt-0" />
              <p className="text-white ms-3">scopri di più</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
