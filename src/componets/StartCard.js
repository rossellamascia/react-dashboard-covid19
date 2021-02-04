import React from "react";
import { formatNumber, lastUpdated } from "../App";

const StartCard = (props) => {

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


    return (
        <div className="col-12 col-md-3 mb-4">
            <div className={`card-custom rounded-3 d-flex flex-column h-100 text-white ${props.color}`} data-trend={props.dataTrend}>
                <p className="ms-3 fs-4 mt-3 fw-light mb-0">{props.name}</p>
                <p id="totalCases" className="fs-3 ms-3 pe-3 text-white fw-bolder">{totalCases(props.dati, props.dataTrend)}</p>
                <hr className="text-white mt-0" />
                <p className="text-white ms-3">scopri di più</p>
            </div>
        </div>
    )
}

export default StartCard;