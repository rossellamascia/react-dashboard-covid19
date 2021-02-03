import React from "react";
import { sortedArray, formatNumber } from "../App";

const StartCard = (props) => {

    const lastUpdated = (dati) => {
        if (dati.length > 0) {
            let sorted = sortedArray(dati)
            // ultima data caricata
            let lastUpdated = sorted[0].data
            // regione con più casi
            let lastUpdatedData = sorted.filter(el => el.data === lastUpdated).sort((a, b) => b.nuovi_positivi - a.nuovi_positivi)
            return lastUpdatedData
        }
    }

    const totalCases = dati => {
        if (dati.length > 0) {
            let lastUpdatedData = lastUpdated(dati)
            // totale casi
            let totalCases = lastUpdatedData.map(el => el.totale_casi).reduce((t, n) => t + n)
            return formatNumber(totalCases)
        }
    };

    const totalRecovered = (dati) => {
        if (dati.length > 0) {
            let lastUpdatedData = lastUpdated(dati)
            let totalRecovered = lastUpdatedData.map(el => el.dimessi_guariti).reduce((t, n) => t + n)
            return formatNumber(totalRecovered)
        }
    }

    const totalDeath = (dati) => {
        if (dati.length > 0) {
            let lastUpdatedData = lastUpdated(dati)
            let totalDeath = lastUpdatedData.map(el => el.deceduti).reduce((t, n) => t + n)
            return formatNumber(totalDeath)
        }
    }

    const totalPositive = (dati) => {
        if (dati.length > 0) {
            let lastUpdatedData = lastUpdated(dati)
            let totalPositive = lastUpdatedData.map(el => el.nuovi_positivi).reduce((t, n) => t + n)
            return formatNumber(totalPositive)
        }
    }

    return (
        <div className="container margin-top-70">
            <div className="row">
                <div className="col-12 col-md-3 mb-4">
                    <div className="card-custom rounded-3 d-flex flex-column h-100 bg-accent text-white"
                        data-trend="totale_casi">
                        <p className="ms-3 fs-4 mt-3 fw-light mb-0">Casi totali</p>
                        <p id="totalCases" className="fs-3 ms-3 pe-3 text-white fw-bolder">{totalCases(props.dati)}</p>
                        <hr className="text-white mt-0" />
                        <p className="text-white ms-3">scopri di più</p>
                    </div>
                </div>
                <div className="col-12 col-md-3 mb-4">
                    <div className="card-custom rounded-3 d-flex flex-column h-100 bg-success text-white"
                        data-trend="dimessi_guariti">
                        <p className="ms-3 fs-4 mt-3 fw-light mb-0">Guariti totali</p>
                        <p id="totalRecovered" className="fs-3 ms-3 pe-3 text-white fw-bolder">{totalRecovered(props.dati)}</p>
                        <hr className="text-white mt-0" />
                        <p className="text-white ms-3">scopri di più</p>
                    </div>
                </div>
                <div className="col-12 col-md-3 mb-4">
                    <div className="card-custom rounded-3 d-flex flex-column h-100 bg-danger text-white" data-trend="deceduti">
                        <p className="ms-3 fs-4 mt-3 fw-light mb-0">Morti totali</p>
                        <p id="totalDeath" className="fs-3 ms-3 pe-3 text-white fw-bolder">{totalDeath(props.dati)}</p>
                        <hr className="text-white mt-0" />
                        <p className="text-white ms-3">scopri di più</p>
                    </div>
                </div>
                <div className="col-12 col-md-3 mb-4">
                    <div className="card-custom rounded-3 d-flex flex-column h-100 bg-warning text-white"
                        data-trend="nuovi_positivi">
                        <p className="ms-3 fs-4 mt-3 fw-light mb-0">Nuovi casi</p>
                        <p id="totalPositive" className="fs-3 ms-3 pe-3 text-white fw-bolder">{totalPositive(props.dati)}</p>
                        <hr className="text-white mt-0" />
                        <p className="text-white ms-3">scopri di più</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartCard;